import React, { useState, useEffect, useRef } from "react";
import { crewProfile } from "../data/profile";
import { missions } from "../data/missions";
import { researchProjects } from "../data/research";
import { missionLogs } from "../data/logs";
import { soundFx } from "../utils/sound";
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TerminalModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    {
      type: "system",
      text: "ORBITAL // RS-01 PRIMARY FLIGHT COMPUTER TELEMETRY INTERFACE [v2.4.8]",
    },
    {
      type: "system",
      text: "TYPE 'help' FOR FLIGHT COMMANDS. ALL SYSTEMS NOMINAL.",
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    soundFx.playTerminalKey();

    if (!cmd) return;

    // Add to command history
    setCmdHistory((prev) => [...prev, rawCmd]);
    setCmdIndex(-1);

    const newHistory = [...history, { type: "user", text: `> ${rawCmd}` }];

    switch (cmd) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE TELEMETRY COMMANDS:
  whoami      - Display identity and station designation
  about       - Detailed crew member biography & education
  missions    - Active mission payload directory
  research    - Scientific investigations in Research Lab
  logs        - Recent flight records from Mission Log
  systems     - Subsystem health and software telemetry
  contact     - Transmission frequencies and docking port
  status      - Orbital telemetry and station state
  goto <path> - Route navigation (e.g., 'goto /missions')
  dock        - Initiate audio docking confirmation sequence
  clear       - Clear console screen buffer
  exit        - Close telemetry console`,
        });
        break;

      case "whoami":
        newHistory.push({
          type: "output",
          text: `A. RAMANUJ PATRO
COMPUTER SCIENCE ENGINEER
FOCUS: AI / ML // SOFTWARE ENGINEERING // BACKEND // RESEARCH
STATION: ORBITAL // RS-01 [CREW MEMBER // 001]
STATUS: SYSTEMS NOMINAL`,
        });
        break;

      case "about":
        newHistory.push({
          type: "output",
          text: `CREW DOSSIER:
Full Name: ${crewProfile.fullName}
Institution: ${crewProfile.education.institution}
Degree: ${crewProfile.education.degree} (${crewProfile.education.period})
Mission Directive: "${crewProfile.missionBio}"`,
        });
        break;

      case "missions":
      case "projects":
        newHistory.push({
          type: "output",
          text: `ORBITAL MISSION PAYLOADS:
${missions
  .map(
    (m) =>
      `  [${m.missionCode}] ${m.title.padEnd(10)} [${m.status.padEnd(8)}] - ${m.tagline}`
  )
  .join("\n")}`,
        });
        break;

      case "research":
      case "lab":
        newHistory.push({
          type: "output",
          text: `RESEARCH LAB INVESTIGATIONS:
${researchProjects
  .map(
    (r) =>
      `  [${r.investigationCode}] ${r.status.padEnd(12)} - ${r.title}`
  )
  .join("\n")}`,
        });
        break;

      case "logs":
      case "blog":
        newHistory.push({
          type: "output",
          text: `RECENT MISSION LOGS:
${missionLogs
  .map((l) => `  [${l.logCode}] ${l.date.padEnd(12)} - ${l.title}`)
  .join("\n")}`,
        });
        break;

      case "systems":
      case "skills":
        newHistory.push({
          type: "output",
          text: `SUBSYSTEM DIAGNOSTICS:
  SYS // 01 [FLIGHT SOFTWARE] : Python, JS/ES6, C++, C, Java
  SYS // 02 [AI & ML SYSTEMS] : Transformers, PyTorch, Semantic Search, Agents
  SYS // 03 [WEB & API ENGINE] : FastAPI, React, Node.js, WebSockets
  SYS // 04 [DATA BUS]        : PostgreSQL, Redis, Supabase, MongoDB
  SYS // 05 [GROUND CONTROL]  : Docker, Git, CI/CD, Cloud Deployments`,
        });
        break;

      case "contact":
        newHistory.push({
          type: "output",
          text: `TRANSMISSION CHANNELS:
  COMM FREQUENCY: ${crewProfile.links.email}
  GITHUB BUS    : ${crewProfile.links.github}
  LINKEDIN LINK : ${crewProfile.links.linkedin}
  DOCKING HARBOR: Route to /contact to send direct signal`,
        });
        break;

      case "status":
        newHistory.push({
          type: "output",
          text: `ORBITAL TELEMETRY:
  Altitude   : ${crewProfile.stats.orbitalAltitude}
  Velocity   : ${crewProfile.stats.orbitalVelocity}
  Inclination: ${crewProfile.stats.orbitalInclination}
  Integrity  : ${crewProfile.stats.systemsNominal}
  Active MSN : ${crewProfile.stats.activeMissions}`,
        });
        break;

      case "dock":
        soundFx.playDock();
        newHistory.push({
          type: "output",
          text: `● INITIATING DOCKING CHIME SEQUENCE...
● ALIGNMENT CONE LOCKED.
● WELCOME ABOARD ORBITAL // RS-01.`,
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        if (cmd.startsWith("goto ")) {
          const dest = cmd.replace("goto ", "").trim();
          navigate(dest);
          newHistory.push({
            type: "output",
            text: `REROUTING AVIONICS DISPLAY TO: ${dest}...`,
          });
        } else {
          newHistory.push({
            type: "error",
            text: `COMMAND NOT RECOGNIZED: "${rawCmd}". Type 'help' for available station commands.`,
          });
        }
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIdx = cmdIndex + 1;
        if (nextIdx < cmdHistory.length) {
          setCmdIndex(nextIdx);
          setInputVal(cmdHistory[nextIdx]);
        } else {
          setCmdIndex(-1);
          setInputVal("");
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl h-[480px] bg-[#080D13] border border-space-accent/40 rounded shadow-[0_0_30px_rgba(102,217,255,0.12)] flex flex-col font-mono text-xs overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="h-9 px-3 bg-space-panel border-b border-white/[0.08] flex items-center justify-between select-none">
          <div className="flex items-center space-x-2 text-space-accent">
            <TerminalIcon className="w-4 h-4" />
            <span className="telemetry text-[11px] font-semibold">
              ORBITAL RS-01 // TELEMETRY CONSOLE
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="telemetry text-[10px] text-space-success">
              ● CONNECTED
            </span>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-1 text-space-textMuted hover:text-white rounded hover:bg-white/[0.08] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Output Log Area */}
        <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-space-text">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={`leading-relaxed whitespace-pre-wrap font-mono ${
                line.type === "system"
                  ? "text-space-accent/80"
                  : line.type === "user"
                  ? "text-white font-semibold"
                  : line.type === "error"
                  ? "text-space-danger"
                  : "text-space-textMuted"
              }`}
            >
              {line.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Bar */}
        <div className="h-10 px-3 bg-space-panel/80 border-t border-white/[0.08] flex items-center space-x-2">
          <span className="text-space-accent font-bold">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or command..."
            className="flex-1 bg-transparent text-space-text font-mono text-xs focus:outline-none placeholder:text-space-textDim/50"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="px-2 py-0.5 rounded bg-space-accent/15 text-space-accent text-[10px] border border-space-accent/30 hover:bg-space-accent/25"
          >
            EXEC
          </button>
        </div>
      </div>
    </div>
  );
}
