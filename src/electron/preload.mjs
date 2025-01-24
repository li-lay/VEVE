import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld("electronExpose", {
  closeWin: () => ipcRenderer.send("close-window"),
  minimizeWin: () => ipcRenderer.send("minimize-window"),
  RestoreORMaximizeWin: () => ipcRenderer.send("restore-maximize-window"),
  onWindowStateChange: (callback) => ipcRenderer.on("window-state", callback),
  getGPUInfo: (callback) => ipcRenderer.on("gpu-detection", callback),
});

console.log("Hello Preload!");
