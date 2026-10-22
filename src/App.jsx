import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import StationNav from "./components/StationNav";
import StationFooter from "./components/StationFooter";
import TerminalModal from "./components/TerminalModal";
import CommandCenter from "./pages/CommandCenter";
import CrewModule from "./pages/CrewModule";
import MissionControl from "./pages/MissionControl";
import MissionDossier from "./pages/MissionDossier";
import ResearchLab from "./pages/ResearchLab";
import ResearchDossier from "./pages/ResearchDossier";
import MissionLogs from "./pages/MissionLogs";
import MissionLogArticle from "./pages/MissionLogArticle";
import SystemsBay from "./pages/SystemsBay";
import FlightHistory from "./pages/FlightHistory";
import DockingPort from "./pages/DockingPort";
import SignalLost404 from "./pages/SignalLost404";
import { soundFx } from "./utils/sound";



/* ── Scroll to top ─────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

/* ── App inner ─────────────────────────────────────────────── */
function AppInner() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith("/logs");

  useEffect(() => {
    const down = (e) => {
      if (e.key === "`" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
        e.preventDefault();
        setTerminalOpen(p => !p);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}
      className="text-[#e2eaf5] selection:bg-[#00d4ff]/25 selection:text-[#00d4ff]"
    >
      {/* Subtle global grid for standard space pages */}
      <div className={`fixed inset-0 grid-overlay pointer-events-none z-[2] transition-opacity duration-700 ${isBlog ? "opacity-0" : "opacity-25"
        }`} />

      {/* Dark Mode Digital Planner & Notebook Dot-Grid Canvas for Blogs - Proper Black */}
      <div
        className={`fixed inset-0 pointer-events-none transition-opacity duration-500 z-[1] ${isBlog ? "opacity-100" : "opacity-0"
          }`}
        style={{
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.055) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      >
        {/* Soft cozy warm tablet lamp glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 30% at 50% 0%, rgba(234, 179, 8, 0.025) 0%, transparent 60%)",
          }}
        />
        {/* Pitch dark vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: "inset 0 0 160px rgba(0, 0, 0, 0.95)",
          }}
        />
      </div>

      <StationNav onOpenTerminal={() => setTerminalOpen(true)} />

      <main style={{ flex: 1, position: "relative", zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<CommandCenter onOpenTerminal={() => setTerminalOpen(true)} />} />
          <Route path="/about" element={<CrewModule />} />
          <Route path="/missions" element={<MissionControl />} />
          <Route path="/missions/:slug" element={<MissionDossier />} />
          <Route path="/research" element={<ResearchLab />} />
          <Route path="/research/:slug" element={<ResearchDossier />} />
          <Route path="/logs" element={<MissionLogs />} />
          <Route path="/logs/:slug" element={<MissionLogArticle />} />
          <Route path="/systems" element={<SystemsBay />} />
          <Route path="/flight-history" element={<FlightHistory />} />
          <Route path="/contact" element={<DockingPort />} />
          <Route path="*" element={<SignalLost404 />} />
        </Routes>
      </main>

      <StationFooter />

      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppInner />
    </BrowserRouter>
  );
}
