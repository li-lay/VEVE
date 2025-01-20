import "./App.css";
import { useEffect, useState } from "react";

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
      <h1>Hello World!</h1>
      <h2>Nodejs: {versions.node}</h2>
      <h2>Chrome: {versions.chrome}</h2>
      <h2>Electron: {versions.electron}</h2>
    </>
  );
}

export default App;
