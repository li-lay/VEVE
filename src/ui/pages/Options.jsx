import { useState } from "react";
import Wrapper from "../components/Wrapper";

const Options = () => {
  const [speed, setSpeed] = useState(1);
  const [frameRate, setFrameRate] = useState(30);

  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2">
        <div className="w-full px-4 my-6 space-y-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[90vw] mx-auto">
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
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
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
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
                    onChange={(e) => setFrameRate(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm accent-orange-500"
                  />
                </div>
              </div>
            </div>
            {/* select file */}
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
              <h2 className="text-xl font-bold text-white mb-2">
                Select folder
              </h2>
              <div className="space-y-4">
                <label for="file" class="custum-file-upload">
                  <div class="icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill=""
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                          fill=""
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div class="text">
                    <span>Click to select folder</span>
                  </div>
                  <input
                    onClick={(e) => {
                      e.preventDefault();
                      electronExpose.openFolder();
                    }}
                    type="file"
                    id="file"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Options;
