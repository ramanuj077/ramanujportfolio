import React, { useState } from "react";
import { motion } from "framer-motion";
import { Radio, Shield, Zap, Orbit, Compass, Activity } from "lucide-react";

export default function OrbitalStationView() {
  const [activeModule, setActiveModule] = useState(null);

  return (
    <div className="relative w-full h-full min-h-[480px] md:min-h-[580px] flex items-center justify-center select-none overflow-visible">
      {/* HUD Radar Rings / Rotating Telemetry Arc */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer Circular Reticle */}
        <div className="w-[420px] sm:w-[560px] md:w-[680px] h-[420px] sm:h-[560px] md:h-[680px] rounded-full border border-cyan-500/10 hud-spin" />

        {/* Inner Segmented Compass Arc */}
        <div className="w-[320px] sm:w-[440px] md:w-[520px] h-[320px] sm:h-[440px] md:h-[520px] rounded-full border border-dashed border-cyan-400/20 hud-pulse" />

        {/* Ambient Cyan Nebula Glow Filter */}
        <div className="w-[400px] h-[260px] bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Atmospheric Horizon Curve (Subtle planet limb glow at bottom) */}
      <div className="absolute -bottom-24 w-full max-w-4xl h-36 bg-gradient-to-t from-cyan-500/15 via-blue-500/5 to-transparent rounded-[50%] blur-2xl pointer-events-none" />
      <div className="absolute bottom-2 w-3/4 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

      {/* Station Vector Rig */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center"
      >
        <div className="relative w-full max-w-[740px] aspect-[16/9] flex items-center justify-center">
          <svg
            viewBox="0 0 800 450"
            className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Photovoltaic Solar Cell Gradient */}
              <linearGradient id="solarGradGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0E2742" />
                <stop offset="50%" stopColor="#1B4268" />
                <stop offset="100%" stopColor="#0B1F34" />
              </linearGradient>

              {/* Solar Array Grid Pattern */}
              <pattern id="solarGridHighTech" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="url(#solarGradGlow)" />
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#66D9FF" strokeWidth="0.45" strokeOpacity="0.65" />
              </pattern>

              {/* Metallic Station Hull Gradient with Specular Rim */}
              <linearGradient id="hullGradSciFi" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A435B" />
                <stop offset="40%" stopColor="#152636" />
                <stop offset="100%" stopColor="#09141F" />
              </linearGradient>

              {/* Glow Filter for Beacons */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Orbit Trajectory Arc Guide */}
            <path
              d="M 40 350 Q 400 230 760 350"
              stroke="#66D9FF"
              strokeWidth="0.9"
              strokeDasharray="4 8"
              strokeOpacity="0.4"
            />

            {/* ================= STATION STRUCTURE ================= */}

            {/* MAIN STRUCTURAL TRUSS BEAM */}
            <rect x="130" y="217" width="540" height="16" fill="#0C1724" stroke="#66D9FF" strokeWidth="1.2" strokeOpacity="0.6" rx="3" />
            <path
              d="M 130 225 H 670 M 180 217 L 200 233 M 220 217 L 240 233 M 280 217 L 300 233 M 500 217 L 520 233 M 560 217 L 580 233 M 620 217 L 640 233"
              stroke="#66D9FF"
              strokeWidth="0.8"
              strokeOpacity="0.5"
            />

            {/* SOLAR ARRAYS (PORT - LEFT WINGS) */}
            <g
              className="cursor-pointer transition-all hover:opacity-100"
              opacity="0.95"
              onMouseEnter={() => setActiveModule("SOLAR ARRAY // PORT ALPHA [98.4% EFFICIENCY]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              {/* Top Left Panel */}
              <rect x="70" y="105" width="140" height="96" fill="url(#solarGridHighTech)" stroke="#66D9FF" strokeWidth="1.2" strokeOpacity="0.7" rx="3" />
              <line x1="70" y1="153" x2="210" y2="153" stroke="#66D9FF" strokeWidth="1" strokeOpacity="0.8" />
              {/* Bottom Left Panel */}
              <rect x="70" y="249" width="140" height="96" fill="url(#solarGridHighTech)" stroke="#66D9FF" strokeWidth="1.2" strokeOpacity="0.7" rx="3" />
              <line x1="70" y1="297" x2="210" y2="297" stroke="#66D9FF" strokeWidth="1" strokeOpacity="0.8" />
              {/* Rotary Joint */}
              <rect x="137" y="198" width="8" height="54" fill="#1C3044" stroke="#66D9FF" strokeWidth="0.8" rx="2" />
            </g>

            {/* SOLAR ARRAYS (STARBOARD - RIGHT WINGS) */}
            <g
              className="cursor-pointer transition-all hover:opacity-100"
              opacity="0.95"
              onMouseEnter={() => setActiveModule("SOLAR ARRAY // STARBOARD BETA [98.6% EFFICIENCY]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              {/* Top Right Panel */}
              <rect x="590" y="105" width="140" height="96" fill="url(#solarGridHighTech)" stroke="#66D9FF" strokeWidth="1.2" strokeOpacity="0.7" rx="3" />
              <line x1="590" y1="153" x2="730" y2="153" stroke="#66D9FF" strokeWidth="1" strokeOpacity="0.8" />
              {/* Bottom Right Panel */}
              <rect x="590" y="249" width="140" height="96" fill="url(#solarGridHighTech)" stroke="#66D9FF" strokeWidth="1.2" strokeOpacity="0.7" rx="3" />
              <line x1="590" y1="297" x2="730" y2="297" stroke="#66D9FF" strokeWidth="1" strokeOpacity="0.8" />
              {/* Rotary Joint */}
              <rect x="655" y="198" width="8" height="54" fill="#1C3044" stroke="#66D9FF" strokeWidth="0.8" rx="2" />
            </g>

            {/* THERMAL RADIATOR VENTS */}
            <rect x="285" y="145" width="34" height="60" fill="#13202E" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.3" rx="2" />
            <line x1="293" y1="145" x2="293" y2="205" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="302" y1="145" x2="302" y2="205" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" />
            <line x1="311" y1="145" x2="311" y2="205" stroke="#FFFFFF" strokeWidth="0.5" strokeOpacity="0.3" />

            {/* CENTRAL PRESSURIZED CORE MODULES */}

            {/* Module 1: AI Research Lab (Left Node) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setActiveModule("MODULE // AI RESEARCH LAB [INVESTIGATIONS ACTIVE]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              <rect x="325" y="202" width="66" height="46" fill="url(#hullGradSciFi)" stroke="#66D9FF" strokeWidth="1.5" rx="4" />
              {/* Viewports with Glowing Cyan Emission */}
              <circle cx="342" cy="225" r="4.5" fill="#66D9FF" opacity="0.9" filter="url(#neonGlow)" />
              <circle cx="358" cy="225" r="4.5" fill="#66D9FF" opacity="0.9" filter="url(#neonGlow)" />
              <circle cx="374" cy="225" r="4.5" fill="#66D9FF" opacity="0.9" filter="url(#neonGlow)" />
              <text x="332" y="242" fill="#66D9FF" fontSize="6" fontFamily="monospace" fontWeight="bold">LAB-01</text>
            </g>

            {/* Module 2: Command Center Hub & Cupola (Center) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setActiveModule("COMMAND CENTER // ORBITAL RS-01 [CORE AVIONICS]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              <rect x="388" y="190" width="50" height="70" fill="url(#hullGradSciFi)" stroke="#66D9FF" strokeWidth="1.8" rx="5" />
              {/* Central Observation Dome */}
              <circle cx="413" cy="215" r="7.5" fill="#0A141F" stroke="#66D9FF" strokeWidth="1.5" />
              <circle cx="413" cy="215" r="3" fill="#5BE38C" filter="url(#neonGlow)" />
              {/* Cupola Window Array */}
              <rect x="398" y="238" width="30" height="14" fill="#060E16" stroke="#66D9FF" strokeWidth="0.9" rx="2" />
              <line x1="408" y1="238" x2="408" y2="252" stroke="#66D9FF" strokeWidth="0.8" />
              <line x1="418" y1="238" x2="418" y2="252" stroke="#66D9FF" strokeWidth="0.8" />
            </g>

            {/* Module 3: Crew Module / Habitat (Right Node) */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setActiveModule("CREW MODULE // ASTRONAUT QUARTERS [OFFICER: RAMANUJ]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              <rect x="435" y="202" width="70" height="46" fill="url(#hullGradSciFi)" stroke="#66D9FF" strokeWidth="1.5" rx="4" />
              {/* Golden Viewport Glow */}
              <circle cx="456" cy="225" r="4.5" fill="#FFB454" opacity="0.9" filter="url(#neonGlow)" />
              <circle cx="472" cy="225" r="4.5" fill="#FFB454" opacity="0.9" filter="url(#neonGlow)" />
              <circle cx="488" cy="225" r="4.5" fill="#FFB454" opacity="0.9" filter="url(#neonGlow)" />
              <text x="444" y="242" fill="#FFB454" fontSize="6" fontFamily="monospace" fontWeight="bold">CREW-01</text>
            </g>

            {/* Axial Forward Docking Port */}
            <g
              className="cursor-pointer"
              onMouseEnter={() => setActiveModule("AXIAL DOCKING PORT // ALPHA [READY FOR CONVERGENCE]")}
              onMouseLeave={() => setActiveModule(null)}
            >
              <rect x="403" y="168" width="20" height="24" fill="#142434" stroke="#66D9FF" strokeWidth="1.2" rx="2" />
              <circle cx="413" cy="176" r="4" fill="#0A131C" stroke="#66D9FF" strokeWidth="0.8" />
              {/* Docking Crosshair */}
              <line x1="413" y1="165" x2="413" y2="169" stroke="#FFB454" strokeWidth="1.5" />
            </g>

            {/* Gimbaled High-Gain Communication Dish */}
            <g>
              <path d="M 452 165 Q 472 148 492 165" stroke="#66D9FF" strokeWidth="1.6" fill="none" />
              <line x1="472" y1="156" x2="472" y2="202" stroke="#66D9FF" strokeWidth="1" />
              <circle cx="472" cy="150" r="2" fill="#66D9FF" filter="url(#neonGlow)" />
            </g>

            {/* Glowing Aviation Strobes & Navigation Beacons */}
            <circle cx="730" cy="205" r="3.5" fill="#5BE38C" filter="url(#neonGlow)" className="animate-pulse" />
            <circle cx="70" cy="205" r="3.5" fill="#FF5C5C" filter="url(#neonGlow)" className="animate-pulse" />
            <circle cx="413" cy="165" r="2.5" fill="#FFFFFF" filter="url(#neonGlow)" className="animate-ping" opacity="0.9" />

            {/* Telemetry Annotation Overlay Lines */}
            <line x1="358" y1="202" x2="358" y2="152" stroke="#66D9FF" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.7" />
            <circle cx="358" cy="152" r="2" fill="#66D9FF" />
            <text x="312" y="144" fill="#66D9FF" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              SYS: AI LAB
            </text>

            <line x1="488" y1="248" x2="488" y2="288" stroke="#FFB454" strokeWidth="0.75" strokeDasharray="3 3" strokeOpacity="0.7" />
            <circle cx="488" cy="288" r="2" fill="#FFB454" />
            <text x="450" y="302" fill="#FFB454" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              ORBIT: 408 KM
            </text>
          </svg>

          {/* Interactive Hover Telemetry Readout */}
          {activeModule && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#091524]/95 border border-cyan-400/80 rounded-sm text-xs telemetry text-cyan-300 shadow-[0_0_20px_rgba(102,217,255,0.4)] whitespace-nowrap z-20 font-bold"
            >
              {activeModule}
            </motion.div>
          )}
        </div>

        {/* Floating Station Telemetry Badges Bar */}
        <div className="w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1 pt-3 border-t border-cyan-500/20 text-center">
          <div className="px-3 py-1.5 bg-[#08121e]/85 backdrop-blur-md border border-cyan-500/25 rounded-sm shadow-lg">
            <span className="block text-[9px] telemetry text-space-textDim">ORBIT ALTITUDE</span>
            <span className="telemetry text-xs text-space-accent font-bold">408.2 KM</span>
          </div>
          <div className="px-3 py-1.5 bg-[#08121e]/85 backdrop-blur-md border border-cyan-500/25 rounded-sm shadow-lg">
            <span className="block text-[9px] telemetry text-space-textDim">GROUND VELOCITY</span>
            <span className="telemetry text-xs text-space-text font-bold">7.66 KM/S</span>
          </div>
          <div className="px-3 py-1.5 bg-[#08121e]/85 backdrop-blur-md border border-cyan-500/25 rounded-sm shadow-lg">
            <span className="block text-[9px] telemetry text-space-textDim">INCLINATION</span>
            <span className="telemetry text-xs text-space-text font-bold">51.64°</span>
          </div>
          <div className="px-3 py-1.5 bg-[#08121e]/85 backdrop-blur-md border border-cyan-500/25 rounded-sm shadow-lg">
            <span className="block text-[9px] telemetry text-space-textDim">STATION POWER</span>
            <span className="telemetry text-xs text-space-success font-bold">98.4% NOMINAL</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
