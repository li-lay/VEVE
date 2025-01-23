import VEVELOGO from "../../assets/VEVELOGO.svg";
import CloseIcon from "../icons/CloseIcon";
import HideIcon from "../icons/HideIcon";
import TitleBarButton from "../TitleBarButton";

const TitleBar = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-1 items-center h-8 w-full py-2 bg-accent z-50 fixed top-0 left-0 draggable">
      {/* Title Contents */}
      <div className="flex justify-start gap-1 w-full col-[1/1] row-[1/1] ps-4">
        <img src={VEVELOGO} alt="VEVE Logo" className="size-6" />
        <h1 className="text-black font-semibold ">VEVE</h1>
      </div>
      {/* Buttons */}
      <div className="w-full col-[1/1] row-[1/1] flex justify-end gap-2 items-center px-4">
        <TitleBarButton
          onClick={() => window.versions.minimizeWin()}
          icon={<HideIcon className="no-drag text-black size-[22px]" />}
        />
        <TitleBarButton
          onClick={() => window.versions.closeWin()}
          icon={<CloseIcon className="no-drag text-black size-[22px]" />}
        />
      </div>
    </div>
  );
};

export default TitleBar;
