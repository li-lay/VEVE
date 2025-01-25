import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";

const Dashboard = () => {
  const [GPUInfo, setGPUInfo] = useState({});

  useEffect(() => {
    electronExpose.askGPUInfo();
    electronExpose.getGPUInfo((event, info) => {
      setGPUInfo(info);
    });

    return () => {
      setGPUInfo({});
    };
  }, []);

  return (
    <Wrapper>
      <div className="mt-8 text-center">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary animate-pulse-slow">
          Welcome to VEVE
        </h1>
        <div className="w-full px-4 my-6 space-y-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[90vw] mx-auto"></div>
          <div className="w-full md:w-max p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
            <h2 className="text-xl font-bold text-white mb-2">GPU</h2>
            <div className="flex items-center justify-between gap-2  p-2 hover:bg-white/5 rounded-lg transition-colors">
              <span className="text-white">Model: </span>
              {GPUInfo.model && GPUInfo.model !== "Unknown" ? (
                <span className="text-accent">{GPUInfo.model}</span>
              ) : (
                <span className="text-accent">loading...</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
