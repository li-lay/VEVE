import si from "systeminformation";
import colors from "colors";
import { setupFFmpeg } from "./ffmpeg.mjs";

// Detect GPU with platform-specific handling
export async function detectGPU() {
  try {
    const gpuInfo = await si.graphics();
    const { model, vendor } = gpuInfo.controllers[0];

    if (vendor.toLowerCase().includes("nvidia")) {
      console.log(
        "NVIDIA GPU detected!!!\n".green + "Hardware:".yellow,
        model.red
      );
    } else if (vendor.toLowerCase().includes("amd")) {
      console.log(
        "AMD GPU detected!!!\n".green + "Hardware:".yellow,
        model.red
      );
    } else if (vendor.toLowerCase().includes("intel")) {
      console.log(
        "Intel GPU detected!!!\n".green + "Hardware:".yellow,
        model.red
      );
    } else {
      console.log("!!!No GPU detected, run on CPU Mode!!!".rainbow);
    }

    return { model: model || "Unknown" };
  } catch (error) {
    console.error("GPU detection failed:", error);
    return { model: `Error - ${error}` };
  }
}

// Detect OS
export async function detectOS() {
  try {
    const systemInfo = await si.osInfo();
    const osPlatform = systemInfo.platform;
    const systemArch = systemInfo.arch;
    const osName = systemInfo.distro;

    if (osPlatform.toLowerCase().includes("window")) {
      console.log(
        "Window System detected!!!\n".green + "OS:".yellow,
        osName.red + "\n" + "Architecture:".yellow,
        systemArch.red
      );
    } else if (osPlatform.toLowerCase().includes("linux")) {
      console.log(
        "Linux System detected!!!\n".green + "OS:".yellow,
        osName.red + "\n" + "Architecture:".yellow,
        systemArch.red
      );
    } else {
      console.log("!!!Unknown Platform, WTF!!!".rainbow);
    }

    return {
      platform: osPlatform || "Unknown",
      arch: systemArch || "Unknown",
      distro: osName || "Unknown",
    };
  } catch (error) {
    console.error("SystemOS detection failed:", error);
    return { platform: `Error - ${error}` };
  }
}

// detect encoders based on GPU
export async function detectEncodersByGPU() {
  const ffmpeg = await setupFFmpeg();
  const gpuInfo = (await si.graphics()).controllers[0];
  const { vendor: GPUCompany } = gpuInfo;

  const vendor = GPUCompany.toLowerCase();

  // Wrap `getAvailableEncoders` in a Promise to handle async properly
  const encoders = await new Promise((resolve, reject) => {
    ffmpeg.getAvailableEncoders((err, encs) => {
      if (err) {
        reject(`Error getting encoders: ${err}`);
      } else {
        resolve(encs);
      }
    });
  });

  // Define GPU-based encoders
  const gpuEncoders = {
    nvidia: ["h264_nvenc", "hevc_nvenc", "av1_nvenc"],
    amd: ["h264_amf", "hevc_amf"],
    intel: ["h264_qsv", "hevc_qsv"],
  };

  // Get best available encoder for detected GPU
  let bestEncoder = "libx264"; // Default CPU-based encoder
  for (const [key, values] of Object.entries(gpuEncoders)) {
    if (vendor.includes(key)) {
      bestEncoder = values.find((enc) => encoders[enc]) || bestEncoder;
      break;
    }
  }

  console.log("Selected encoder: ".yellow + bestEncoder.green);
  return bestEncoder;
}
