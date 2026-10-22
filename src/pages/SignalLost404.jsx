import React from "react";
import { Link } from "react-router-dom";
import { soundFx } from "../utils/sound";
import { Radio, ArrowLeft, Orbit, Compass } from "lucide-react";

export default function SignalLost404() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full aerospace-panel-solid p-8 rounded-sm border border-space-warning/40 text-center relative overflow-hidden shadow-[0_0_40px_rgba(255,180,84,0.08)]">
        {/* Reticle / Warning Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-space-warning/10 border border-space-warning/40 flex items-center justify-center text-space-warning mb-4 animate-pulse">
          <Radio className="w-8 h-8" />
        </div>

        <div className="telemetry text-xs text-space-warning font-bold tracking-widest mb-1">
          SIGNAL LOST // AVIONICS FAULT
        </div>

        <h1 className="text-6xl font-bold font-mono text-white mb-2 tracking-tight">
          404
        </h1>

        <div className="p-3 bg-space-elevated rounded-sm border border-white/[0.06] mb-6 text-xs font-mono text-space-textMuted">
          <p>
            TRANSPONDER DISCONNECTED FROM ORBITAL // RS-01. THE REQUESTED MODULE COORDINATES CANNOT BE RESOLVED ON THE ACTIVE ORBITAL PLANE.
          </p>
        </div>

        <Link
          to="/"
          onClick={() => soundFx.playDock()}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-space-accent text-[#05070B] font-mono text-xs font-bold rounded-sm hover:bg-[#85e2ff] transition-all shadow-[0_0_20px_rgba(102,217,255,0.3)]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO COMMAND CENTER</span>
        </Link>
      </div>
    </div>
  );
}
