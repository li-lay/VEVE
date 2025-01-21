import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

function App() {
  const [versions, setVersions] = useState({});

  useEffect(() => {
    // Access the exposed versions object
    const nodeVersion = window.versions.node();
    const chromeVersion = window.versions.chrome();
    const electronVersion = window.versions.electron();

    // Set the versions in the state
    setVersions({
      node: nodeVersion,
      chrome: chromeVersion,
      electron: electronVersion,
    });
  }, []);

  return (
    <>
      {/* <h1>Hello World!</h1>
      <h2>Nodejs: {versions.node}</h2>
      <h2>Chrome: {versions.chrome}</h2>
      <h2>Electron: {versions.electron}</h2> */}
      <header className="w-full h-max">
        <TitleBar />
      </header>
      <main className="w-full h-full flex flex-row gap-6 ">
        <Sidebar />
      </main>
    </>
  );
}

export default App;
