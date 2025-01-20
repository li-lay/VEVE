import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  win.loadFile(path.join("dist-react/index.html"));

  // TODO: make a DevTools toggle with globalShortcut F11 -
  // F12 for toggling the devtools is
  //  not working properly, so I changed to F11
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
