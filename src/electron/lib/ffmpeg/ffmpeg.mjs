import ffmpeg from "fluent-ffmpeg";
import path from "path";
import { fileURLToPath } from "url";
import { detectOS } from "../detects.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function setupFFmpeg() {
  const osInfo = await detectOS();
  const isWindows = osInfo.platform.toLowerCase().includes("window");

  const ffmpegPath = path.join(
    __dirname,
    isWindows ? "win/ffmpeg.exe" : "linux/ffmpeg"
  );
  const ffprobePath = path.join(
    __dirname,
    isWindows ? "win/ffprobe.exe" : "linux/ffprobe"
  );

  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  return ffmpeg();
}
