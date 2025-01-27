import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import Loading from "../components/Loading";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[80%] 2xl:max-w-[60%] mx-auto"></div>
          <div className="w-full md:w-max p-6 2xl:p-8 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-4">
            <h2 className="text-2xl 2xl:text-3xl font-bold text-white mb-4">
              System
            </h2>
            <div className="space-y-1">
              <div className="p-3 2xl:p-4 hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-1">
                <span className="text-white 2xl:text-xl">OS: </span>
                {systemInfo.platform ? (
                  <span className="text-accent 2xl:text-xl">
                    {systemInfo.distro} {systemInfo.arch}
                  </span>
                ) : (
                  <Loading
                    size="size-[16px]"
                    outerColor="white/20"
                    innerColor="accent"
                  />
                )}
              </div>
              <div className="p-3 2xl:p-4 hover:bg-white/5 rounded-lg transition-colors text-left flex items-center gap-1">
                <span className="text-white 2xl:text-xl">GPU: </span>
                {GPUInfo.model && GPUInfo.model !== "Unknown" ? (
                  <span className="text-accent 2xl:text-xl">
                    {GPUInfo.model}
                  </span>
                ) : (
                  <Loading
                    size="size-[16px]"
                    outerColor="white/20"
                    innerColor="accent"
                  />
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
