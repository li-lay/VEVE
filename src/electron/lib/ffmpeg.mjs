import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

export async function setupFFmpeg() {
  // const ffmpegPath = ffmpegInstaller.path;
  // const ffprobePath = ffprobeInstaller.path;

  //FIX: replace asar with asar.unpacked // it's a known issue
  const ffmpegPath = ffmpegInstaller.path.replace(
    "app.asar",
    "app.asar.unpacked"
  );
  const ffprobePath = ffprobeInstaller.path.replace(
    "app.asar",
    "app.asar.unpacked"
  );

  // console.log("FFmpeg Path:", ffmpegPath);
  // console.log("FFprobe Path:", ffprobePath);

  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobePath);
  return ffmpeg();
}
