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
  askGPUInfo: () => ipcRenderer.send("get-gpu-info"),
  getGPUInfo: (callback) => ipcRenderer.on("gpu-info", callback),
  askSystemInfo: () => ipcRenderer.send("get-system-info"),
  getSystemInfo: (callback) => ipcRenderer.on("system-info", callback),
  openFolder: () => ipcRenderer.send("open-folder"),
});

console.log("Hello Preload!");
