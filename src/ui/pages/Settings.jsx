import Wrapper from "../components/Wrapper";
import VEVELOGO from "../assets/VEVELOGO.png";

const Settings = () => {
  return (
    <Wrapper>
      <div className="fixed left-0 right-0 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <img className="size-20" src={VEVELOGO} />
          <h1 className="text-3xl font-bold text-white">VEVE</h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
