import Sidebar from "./components/Sidebar/Sidebar";
import TitleBar from "./components/TitleBar/TitleBar";
import Dashboard from "./pages/Dashboard";
import Options from "./pages/Options";
import Progress from "./pages/Progress";
import About from "./pages/About";
import Settings from "./pages/Settings";
import { Routes, Route } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <header className="w-full h-max">
        <TitleBar />
      </header>
      <main className="w-full h-full flex flex-row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/options" element={<Options />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
