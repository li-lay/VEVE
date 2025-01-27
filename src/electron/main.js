import { app, BrowserWindow, globalShortcut } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import {
  setupIPCListeners,
  setupWindowEvents,
  setupDevToolsShortcut,
  cleanupIPCListeners,
} from "./lib/setups.mjs";

// Load environment variables
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

// Set current app mode - "development" | "production"
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to create a new browser window
const createWindow = () => {
  try {
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
    setupIPCListeners(win);
    setupWindowEvents(win);

    // HOT RELOADING
    if (process.env.NODE_ENV !== "production") {
      win.loadURL("http://localhost:5173");
      setupDevToolsShortcut(win);
    } else {
      win.loadFile(path.join("dist-react/index.html"));
    }

    return win;
  } catch (error) {
    console.error("Failed to create the browser window:", error);
  }
};

app.whenReady().then(() => createWindow());

// Unregister all shortcuts when the app quits
app.on("will-quit", () => {
  cleanupIPCListeners();
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
