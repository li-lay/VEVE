import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// Get the environment variables
dotenv.config();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../../VEVELOGO.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Disable remote module
      nodeIntegration: true,
    },
  });

  // ===== HOT RELOADING =====
  // create VITE_DEV_MODE in .env for development mode
  // delete/comment out the VITE_DEV_MODE when building binaries
  if (process.env.VITE_DEV_MODE) {
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
};

app.whenReady().then(() => {
  createWindow();
});

// Unregister all shortcuts when the app quits
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
