import { app, BrowserWindow, globalShortcut } from "electron";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { setupFFmpeg, createFFmpeg } from "./lib/ffmpeg/ffmpeg.mjs";
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

// Test FFmpeg setup and functionality
async function testFFmpeg() {
  try {
    console.log("Testing FFmpeg setup...");
    await setupFFmpeg();
    const command = createFFmpeg();

    // Test FFmpeg by getting version info
    command
      .on("start", (commandLine) => {
        console.log("FFmpeg command:", commandLine);
      })
      .on("error", (err) => {
        console.error("FFmpeg test failed:", err);
      })
      .on("end", () => {
        console.log("FFmpeg test successful!");
      })
      .outputOptions(["-version"])
      .output("/dev/null")
      .run();
  } catch (error) {
    console.error("FFmpeg setup failed:", error);
  }
}

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

app.whenReady().then(async () => {
  await testFFmpeg();
  createWindow();
});

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
