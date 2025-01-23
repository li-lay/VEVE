import Wrapper from "../components/Wrapper";
import VEVELOGO from "../assets/VEVELOGO.svg";

const Settings = () => {
  return (
    <Wrapper>
      <div className="fixed left-0 right-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 mt-6">
          <img className="size-20" src={VEVELOGO} alt="VEVE Logo" />
          <h1 className="text-3xl font-bold text-white">VEVE</h1>
        </div>
        <div className="flex mt-6">
          <ul className="">
            <li>
              <button className="w-full cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black text-white hover:bg-opacity-70 transition font-semibold shadow-md justify-center">
                Test0
              </button>
            </li>
            <li>
              <button className="w-full cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black text-white hover:bg-opacity-70 transition font-semibold shadow-md justify-center">
                Test1
              </button>
            </li>
            <li>
              <button className="w-full cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black text-white hover:bg-opacity-70 transition font-semibold shadow-md justify-center">
                About
              </button>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
