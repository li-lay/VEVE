import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { loadEnv } from "vite";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get the environment variables
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd());

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Disable remote module
      nodeIntegration: true,
    },
  });

  // check if the app is running in development mode
  // if VITE_DEV_MODE exists in .env, then we are in dev mode
  if (env.VITE_DEV_MODE) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join("dist-react/index.html"));
  }

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
};

app.whenReady().then(() => {
  createWindow();
});

// Unregister all shortcuts when the app quits
app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
