import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  closeWin: () => ipcRenderer.send("close-window"),
  minimizeWin: () => ipcRenderer.send("minimize-window"),
});

console.log("Hello Preload!");
