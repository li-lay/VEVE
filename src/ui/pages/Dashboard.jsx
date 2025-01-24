import { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";

const Dashboard = () => {
  const [GPUInfo, setGPUInfo] = useState({});

  useEffect(() => {
    window.electronExpose.getGPUInfo((event, data) => {
      setGPUInfo(data);
    });

    return () => {
      window.electronExpose.getGPUInfo(() => {});
    };
  }, []);

  return (
    <Wrapper>
      <div className="mt-8 text-center">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary animate-pulse-slow">
          Welcome to VEVE
        </h1>
        <p className="mt-4 text-white max-w-2xl mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
          Happy New Year 2025
        </p>

        {GPUInfo.isNVIDIA && (
          <p className="mt-4 text-white max-w-2xl mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
            Your GPU is NVIDIA
          </p>
        )}
        {GPUInfo.isAMD && (
          <p className="mt-4 text-white max-w-2xl mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
            Your GPU is AMD
          </p>
        )}
        {GPUInfo.isIntel && (
          <p className="mt-4 text-white max-w-2xl mx-auto text-[clamp(1rem,2.5vw,1.25rem)]">
            Your GPU is Intel
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default Dashboard;
