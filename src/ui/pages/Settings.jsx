import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import VEVELOGO from "../assets/VEVELOGO.svg";
import packageJson from "../../../package.json";

const Settings = () => {
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);
  return (
    <Wrapper>
      <div className="flex flex-col items-center gap-2 ">
        <div className="flex items-center gap-2 mt-6 w-full justify-center">
          <img
            className="w-[10vw] h-[10vw] min-w-16 min-h-16 max-w-32 max-h-32"
            src={VEVELOGO}
            alt="VEVE Logo"
          />
          <h1 className="text-[4vw] md:text-3xl font-bold text-white">VEVE</h1>
        </div>
        <div className="w-full px-4 mt-6 mb-6 space-y-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[90vw] mx-auto">
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
              <h2 className="text-xl font-bold text-white mb-2">Appearance</h2>
              <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">Dark Mode</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    id="dark-mode"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="dark-mode"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">Language</span>
                <select className="bg-black/30 text-white px-3 py-1 rounded-md border border-white/20">
                  <option>English</option>
                  <option>ភាសាខ្មែរ</option>
                </select>
              </div>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 space-y-3">
              <h2 className="text-xl font-bold text-white mb-2">
                Notifications
              </h2>
              <div className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                <span className="text-white">System Notifications</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    id="system-notifications"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="system-notifications"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4">About</h2>
            <div className="space-y-2 text-white/80">
              <p>Version: {packageJson.version}</p>
              <p>Node: {window.versions.node()}</p>
              <p>Chrome: {window.versions.chrome()}</p>
              <p>Electron: {window.versions.electron()}</p>
              <p>© {new Date().getFullYear()} VEVE. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
