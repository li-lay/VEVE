import { ipcMain, globalShortcut, dialog } from "electron";
import { detectGPU, detectOS } from "./detects.mjs";

export const setupIPCListeners = (win) => {
  ipcMain.on("close-window", () => win.close());
  ipcMain.on("minimize-window", () => win.minimize());
  ipcMain.on("restore-maximize-window", () =>
    win.isMaximized() ? win.restore() : win.maximize()
  );
  ipcMain.on("get-gpu-info", handleCachedInfo(win, "gpu-info", detectGPU));
  ipcMain.on("get-system-info", handleCachedInfo(win, "system-info", detectOS));
  ipcMain.on("open-folder", async (event) => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });
    if (!result.canceled && result.filePaths.length > 0) {
      event.sender.send("folder-selected", result.filePaths[0]);
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
