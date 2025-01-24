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
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Options;
