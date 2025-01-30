import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";

const Options = () => {
  const [speed, setSpeed] = useState(1);
  const [frameRate, setFrameRate] = useState(30);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [videos, setVideos] = useState([]);
  const [processInfo, setProcessInfo] = useState(0);

  useEffect(() => {
    // Get saved values when component mounts
    window.electronExpose.getSavedFolder();
    window.electronExpose.getSavedSpeed();
    window.electronExpose.getSavedFrameRate();
    window.electronExpose.getVidsFromSavedFolder();

    const handleFolderSelected = (event, path, videos) => {
      setSelectedFolder(path);
      setVideos(videos);
    };
    const handleSpeedChanged = (event, speed) => {
      setSpeed(speed);
    };
    const handleFrameRateChanged = (event, frameRate) => {
      setFrameRate(frameRate);
    };
    const handleGettingVidsFromSavedFolder = (event, videos) => {
      setVideos(videos);
    };
    const handleProcessingInfo = (event, info) => {
      setProcessInfo(info);
    };

    window.electronExpose.onFolderSelected(handleFolderSelected);
    window.electronExpose.onSpeedChanged(handleSpeedChanged);
    window.electronExpose.onFrameRateChanged(handleFrameRateChanged);
    window.electronExpose.onGettingVidsFromSavedFolder(
      handleGettingVidsFromSavedFolder
    );
    window.electronExpose.getProcessingInfo(handleProcessingInfo);

    return () => {
      window.electronExpose.onFolderSelected(handleFolderSelected);
      window.electronExpose.onSpeedChanged(handleSpeedChanged);
      window.electronExpose.onFrameRateChanged(handleFrameRateChanged);
      window.electronExpose.onGettingVidsFromSavedFolder(
        handleGettingVidsFromSavedFolder
      );
      window.electronExpose.getProcessingInfo(handleProcessingInfo);
    };
  }, []);

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 space-y-4 mx-auto">
          {/* select file */}
          <div className="max-w-[90vw] mx-auto p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
            <h2 className="text-xl font-bold text-white mb-2">Select folder</h2>
            <div className="space-y-4">
              <div className="flex flex-row items-center gap-2 w-full">
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    electronExpose.openFolder();
                  }}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                >
                  Browse
                </button>
                <div className="text-sm text-white/60 bg-white/10 px-4 py-2 rounded-lg truncate flex-1">
                  {selectedFolder ? `${selectedFolder}` : "No folder selected"}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[90vw] mx-auto">
            <div className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
              <h2 className="text-xl font-bold text-white mb-2">Folder</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Videos Found</span>
                  <span className="text-2xl font-bold text-orange-500"></span>
                  {videos?.length || 0}
                </div>
              </div>
            </div>
            <div className="w-full p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
              <h2 className="text-xl font-bold text-white mb-2">Playback</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Speed</span>
                    <span className="text-white">{speed}x</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2"
                    step="0.05"
                    value={speed}
                    onChange={(e) => {
                      const newSpeed = parseFloat(e.target.value);
                      setSpeed(newSpeed);
                      window.electronExpose.saveSpeed(newSpeed);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm accent-orange-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white">Frame Rate</span>
                    <span className="text-white">{frameRate}fps</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={frameRate}
                    onChange={(e) => {
                      const newFrameRate = parseInt(e.target.value);
                      setFrameRate(newFrameRate);
                      window.electronExpose.saveFrameRate(newFrameRate);
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm accent-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={async () => {
                try {
                  await window.electronExpose.startProcessing({
                    speed,
                    frameRate,
                    videos,
                  });
                } catch (error) {
                  console.error("Processing failed:", error);
                }
              }}
              disabled={
                !selectedFolder || videos?.length === 0 || processInfo > 0.0
              }
              className={`px-6 py-3 text-white rounded-lg transition-colors bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 disabled:cursor-not-allowed`}
            >
              {processInfo > 0.0 ? "Rendering..." : "Start Processing"}
            </button>

            <div className="max-w-[90vw] mx-auto mt-5 h-6 w-full border border-white/20 rounded-xl bg-white/10 overflow-hidden">
              <p
                style={{ width: `${processInfo.toFixed(2)}%` }}
                className={`bg-orange-500 h-full m-0 text-sm p-0 transition-all rounded-e-xl`}
              >
                {processInfo.toFixed(0)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Options;
