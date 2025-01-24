import { useState, useEffect } from "react";
import VEVELOGO from "../../assets/VEVELOGO.svg";
import TitleBarButton from "../TitleBarButton";
import CloseIcon from "../icons/CloseIcon";
import MinimizeIcon from "../icons/MinimizeIcon";
import MaximizeIcon from "../icons/MaximizeIcon";
import RestoreIcon from "../icons/RestoreIcon";

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState("restored");

  useEffect(() => {
    window.electronExpose.onWindowStateChange((event, state) => {
      setIsMaximized(state);
    });

    return () => {
      window.electronExpose.onWindowStateChange(() => {});
    };
  }, []);

  return (
    <div className="grid grid-cols-1 grid-rows-1 items-center h-8 w-full py-2 bg-accent z-50 fixed top-0 left-0 draggable">
      {/* Title Contents */}
      <div className="flex justify-start gap-1 w-full col-[1/1] row-[1/1] ps-4">
        <img src={VEVELOGO} alt="VEVE Logo" className="size-6" />
        <h1 className="text-black font-semibold ">VEVE</h1>
      </div>
      {/* Buttons */}
      <div className="w-full col-[1/1] row-[1/1] flex justify-end gap-4 items-center px-4">
        <TitleBarButton
          onClick={() => window.electronExpose.minimizeWin()}
          icon={<MinimizeIcon className="no-drag text-black size-3.5" />}
        />
        {isMaximized === "restored" ? (
          <TitleBarButton
            onClick={() => window.electronExpose.RestoreORMaximizeWin()}
            icon={<MaximizeIcon className="no-drag text-black size-3.5" />}
          />
        ) : (
          <TitleBarButton
            onClick={() => window.electronExpose.RestoreORMaximizeWin()}
            icon={<RestoreIcon className="no-drag text-black size-3.5" />}
          />
        )}
        <TitleBarButton
          onClick={() => window.electronExpose.closeWin()}
          icon={<CloseIcon className="no-drag text-black size-3.5" />}
        />
      </div>
    </div>
  );
};

export default TitleBar;
