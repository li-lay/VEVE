import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";

const Dashboard = () => {
  const [GPUInfo, setGPUInfo] = useState({});
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    electronExpose.askGPUInfo();
    electronExpose.getGPUInfo((event, info) => {
      setGPUInfo(info);
    });

    electronExpose.askSystemInfo();
    electronExpose.getSystemInfo((event, info) => {
      setSystemInfo(info);
    });

    return () => {
      setGPUInfo({});
      setSystemInfo({});
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
            <h2 className="text-xl font-bold text-white mb-2">System</h2>
            <div className="space-y-2">
              <div className="p-2 hover:bg-white/5 rounded-lg transition-colors text-left">
                <span className="text-white">OS: </span>
                {systemInfo.platform ? (
                  <span className="text-accent">
                    {systemInfo.distro} {systemInfo.arch}
                  </span>
                ) : (
                  <span className="text-accent">loading...</span>
                )}
              </div>
              <div className="p-2 hover:bg-white/5 rounded-lg transition-colors text-left">
                <span className="text-white">GPU: </span>
                {GPUInfo.model && GPUInfo.model !== "Unknown" ? (
                  <span className="text-accent">{GPUInfo.model}</span>
                ) : (
                  <span className="text-accent">loading...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
