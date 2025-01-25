import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import si from "systeminformation";
import colors from "colors";

// Get the environment variables
dotenv.config();

// Set current app mode - "development" | "production"
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minimizable: true,
    minWidth: 600,
    minHeight: 400,
    darkTheme: true,
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, "../../VEVELOGO.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Disable remote module
      nodeIntegration: true,
    },
  });

  // HOT RELOADING
  if (process.env.NODE_ENV !== "production") {
    win.loadURL("http://localhost:5173");

    // Toggling Devtools using F11 shortcut
    globalShortcut.register("F11", () => {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
        win.setSize(800, 600);
      } else {
        win.webContents.openDevTools();
        win.setSize(1200, 600);
      }
    });
  } else {
    win.loadFile(path.join("dist-react/index.html"));
  }

  // Close window
  ipcMain.on("close-window", () => {
    win.close();
  });

  // minimize window
  ipcMain.on("minimize-window", () => {
    win.minimize();
  });

  // restore or maximize window
  ipcMain.on("restore-maximize-window", () => {
    if (win.isMaximized()) {
      win.restore();
    } else {
      win.maximize();
    }
  });

  // handle get GPU info with caches
  let cacheGPUInfo = null;
  ipcMain.on("get-gpu-info", async () => {
    if (cacheGPUInfo) {
      win.webContents.send("gpu-info", cacheGPUInfo);
    } else {
      const gpuInfo = await detectGPU();
      cacheGPUInfo = gpuInfo;
      win.webContents.send("gpu-info", gpuInfo);
    }
  });

  // get window states
  win.on("maximize", () => {
    win.webContents.send("window-state", "maximized");
  });

  win.on("unmaximize", () => {
    win.webContents.send("window-state", "restored");
  });

  win.on("minimize", () => {
    win.webContents.send("window-state", "minimized");
  });

  win.on("restore", () => {
    win.webContents.send("window-state", "restored");
  });

  return win;
};

app.whenReady().then(async () => {
  const win = createWindow();
});

// Unregister all shortcuts when the app quits
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Detect GPU with platform-specific handling
async function detectGPU() {
  try {
    const gpuInfo = await si.graphics();
    const isNVIDIA = gpuInfo.controllers.some((c) =>
      c.vendor.toLowerCase().includes("nvidia")
    );
    const isAMD = gpuInfo.controllers.some((c) =>
      c.vendor.toLowerCase().includes("amd")
    );
    const isIntel = gpuInfo.controllers.some((c) =>
      c.vendor.toLowerCase().includes("intel")
    );

    if (isNVIDIA) {
      console.log(
        "NVIDIA GPU detected!!!\n".green + "Hardware:".yellow,
        gpuInfo.controllers[0].model.toString().red
      );
    } else if (isAMD) {
      console.log(
        "AMD GPU detected!!!\n".green + "Hardware:".yellow,
        gpuInfo.controllers[0].model.toString().red
      );
    } else if (isIntel) {
      console.log(
        "Intel GPU detected!!!\n".green + "Hardware:".yellow,
        gpuInfo.controllers[0].model.toString().red
      );
    } else {
      console.log("!!!No GPU detected, run on CPU Mode!!!".rainbow);
    }

    const model = gpuInfo.controllers[0]?.model || "Unknown";
    return { isNVIDIA, isAMD, isIntel, model };
  } catch (error) {
    console.error("GPU detection failed:", error);
    return { isNVIDIA: false, isAMD: false, isIntel: false };
  }
}
