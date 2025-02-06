import { ipcMain, globalShortcut, dialog, app } from "electron";
import fs from "fs";
import path from "path";
import { detectEncodersByGPU, detectGPU, detectOS } from "./detects.mjs";
import { setupFFmpeg } from "./ffmpeg.mjs";

export const setupIPCListeners = (win) => {
  ipcMain.on("close-window", () => win.close());
  ipcMain.on("minimize-window", () => win.minimize());
  ipcMain.on("restore-maximize-window", () =>
    win.isMaximized() ? win.restore() : win.maximize()
  );
  ipcMain.on("get-gpu-info", handleCachedInfo(win, "gpu-info", detectGPU));
  ipcMain.on("get-system-info", handleCachedInfo(win, "system-info", detectOS));
  const getConfigPath = () => path.join(app.getPath("userData"), "config.json");

  ipcMain.on("open-folder", async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (!result.canceled && result.filePaths.length > 0) {
      const selectedPath = result.filePaths[0];
      // Save the selected path
      fs.writeFileSync(
        getConfigPath(),
        JSON.stringify({ selectedFolder: selectedPath })
      );

      // get all videos from selectedPath
      const videos = fs
        .readdirSync(selectedPath, {
          encoding: "utf-8",
          withFileTypes: true,
        })
        .filter((item) => item.isFile() && item.name.endsWith(".mp4"))
        .map((item) => path.join(selectedPath, item.name));

      event.sender.send("folder-selected", selectedPath, videos);
    }
  });

  ipcMain.on("get-saved-folder", (event) => {
    try {
      const config = JSON.parse(fs.readFileSync(getConfigPath()));
      if (config.selectedFolder) {
        event.sender.send("folder-selected", config.selectedFolder);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Handle speed persistence
  ipcMain.on("get-saved-speed", (event) => {
    try {
      const config = JSON.parse(fs.readFileSync(getConfigPath()));
      if (config.speed) {
        event.sender.send("speed-changed", config.speed);
      }
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.on("save-speed", (event, speed) => {
    try {
      const configPath = getConfigPath();
      const config = fs.existsSync(configPath)
        ? JSON.parse(fs.readFileSync(configPath))
        : {};
      config.speed = speed;
      fs.writeFileSync(configPath, JSON.stringify(config));
      event.sender.send("speed-changed", speed);
    } catch (err) {
      console.log(err);
    }
  });

  // Handle frame rate persistence
  ipcMain.on("get-saved-frame-rate", (event) => {
    try {
      const config = JSON.parse(fs.readFileSync(getConfigPath()));
      if (config.frameRate) {
        event.sender.send("frame-rate-changed", config.frameRate);
      }
    } catch (err) {
      console.log(err);
    }
  });

  // Handle getting videos from saved folder
  ipcMain.on("get-vids-from-saved-folder", (event) => {
    try {
      const config = JSON.parse(fs.readFileSync(getConfigPath()));
      if (config.selectedFolder) {
        const videos = fs
          .readdirSync(config.selectedFolder, {
            encoding: "utf-8",
            withFileTypes: true,
          })
          .filter((item) => item.isFile() && item.name.endsWith(".mp4"))
          .map((item) => path.join(config.selectedFolder, item.name));
        event.sender.send("vids-from-saved-folder", videos);
      }
    } catch (err) {
      console.log(err);
    }
  });

  ipcMain.on("save-frame-rate", (event, frameRate) => {
    try {
      const configPath = getConfigPath();
      const config = fs.existsSync(configPath)
        ? JSON.parse(fs.readFileSync(configPath))
        : {};
      config.frameRate = frameRate;
      fs.writeFileSync(configPath, JSON.stringify(config));
      event.sender.send("frame-rate-changed", frameRate);
    } catch (err) {
      console.log(err);
    }
  });

  // rendering videos
  ipcMain.on("start-processing", async (event, options) => {
    try {
      const command = await setupFFmpeg();
      // const encoder = await detectEncoders();
      const encoder = await detectEncodersByGPU();
      const { speed, frameRate, videos } = options;

      const totalVideos = videos.length;
      let totalProgress = 0;
      let totalDone = 0;

      // Function to render a video sequentially
      const renderVideoSequentially = async (video, index) => {
        return new Promise((resolve, reject) => {
          const videoProgContribute = 100 / totalVideos;

          const videoCommand = command.clone();

          videoCommand
            .on("progress", (prog) => {
              if (!Number.isNaN(prog.percent) && prog.percent !== undefined) {
                const currentVideoProgress =
                  (prog.percent / 100) * videoProgContribute;
                totalProgress =
                  index * videoProgContribute + currentVideoProgress;

                // Ensure totalProgress not go over 100%
                totalProgress = Math.min(totalProgress, 100);

                console.log(
                  `Rendering video ${index + 1}: ${prog.percent.toFixed(
                    2
                  )}% (Total Progress: ${totalProgress.toFixed(2)}%)`
                );
                event.sender.send(
                  "processing-info",
                  parseFloat(totalProgress.toFixed(2))
                );
              }
            })
            .input(video)
            .outputOptions([
              `-filter:v setpts=${parseFloat(1 / speed)}*PTS`, // Change video speed
              `-filter:a atempo=${speed}`, // Change audio speed
              `-c:v ${encoder}`, // Use encoder of the system
              `-r ${frameRate}`, // Set frame rate
            ])
            .output(
              path.join(
                path.dirname(video),
                `veve-${getFormattedTime()}-${path.basename(video)}`
              )
            )
            .on("end", () => {
              console.log(`Rendering video ${index + 1}: Done!`);
              totalDone++;
              if (totalDone === totalVideos) {
                event.sender.send("processing-done", true);
              }
              resolve(); // Resolve after the video has finished rendering
            })
            .on("error", (err) => {
              console.error("Error rendering video:", err);
              reject(err); // Reject if there's an error during the process
            })
            .run();
        });
      };

      for (let idx = 0; idx < totalVideos; idx++) {
        await renderVideoSequentially(videos[idx], idx); // Wait each video rendering
      }
    } catch (error) {
      console.error("Processing failed:", error);
    }
  });
};

export const setupWindowEvents = (win) => {
  const sendState = (stateName, state) =>
    win.webContents.send(stateName, state);

  // get window states
  win.on("maximize", () => sendState("window-state", "maximized"));
  win.on("unmaximize", () => sendState("window-state", "restored"));
  win.on("minimize", () => sendState("window-state", "minimized"));
  win.on("restore", () => sendState("window-state", "restored"));
  win.on("closed", () => cleanupIPCListeners());
};

export const setupDevToolsShortcut = (win) => {
  globalShortcut.register("F11", () => {
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools();
      win.setSize(800, 600);
    } else {
      win.webContents.openDevTools();
      win.setSize(1200, 600);
    }
  });
};

const handleCachedInfo = (win, cacheKey, getInfo) => {
  /**
   * @param win: BrowerWindow - the BrowserWindow
   * @param cacheKey: string - the channel name for preload
   * @param getInfo: Promise<void> - the function to get the info
   * @return Promise<void> - the function that cached info
   */

  let cache = null;
  return async () => {
    if (!cache) {
      cache = await getInfo();
    }
    win.webContents.send(cacheKey, cache);
  };
};

const getFormattedTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
};

export const cleanupIPCListeners = () => {
  try {
    // Remove all IPC listeners
    ipcMain.removeAllListeners("close-window");
    ipcMain.removeAllListeners("minimize-window");
    ipcMain.removeAllListeners("restore-maximize-window");
    ipcMain.removeAllListeners("get-gpu-info");
    ipcMain.removeAllListeners("get-system-info");
    ipcMain.removeAllListeners("open-folder");
    ipcMain.removeAllListeners("get-saved-folder");
    ipcMain.removeAllListeners("get-saved-speed");
    ipcMain.removeAllListeners("save-speed");
    ipcMain.removeAllListeners("get-saved-frame-rate");
    ipcMain.removeAllListeners("save-frame-rate");

    // Unregister global shortcuts
    globalShortcut.unregister("F11");
  } catch (error) {
    console.error("Error during IPC cleanup:", error);
  }
};
