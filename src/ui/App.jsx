import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import TitleBar from "./components/TitleBar/TitleBar";
import Dashboard from "./pages/Dashboard";
import Options from "./pages/Options";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import { Routes, Route, useLocation } from "react-router";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("slide-right");

  useEffect(() => {
    setTransitionStage("slide-right");
    setDisplayLocation(location);
  }, [location]);

  return (
    <div className="route-container">
      <div
        key={displayLocation.pathname}
        className={`route-wrapper ${transitionStage}`}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/options" element={<Options />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <header className="w-full h-max">
        <TitleBar />
      </header>
      <main className="w-full h-full flex flex-row">
        <Sidebar />
        <AnimatedRoutes />
      </main>
    </>
  );
}

export default App;
