import { app, BrowserWindow, globalShortcut } from "electron";
import path from "path";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    darkTheme: true,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true, // Recommended for security
      enableRemoteModule: false, // Disable remote module
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
