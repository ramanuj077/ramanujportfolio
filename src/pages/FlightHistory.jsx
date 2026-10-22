import React from "react";
import { flightHistory } from "../data/experience";
import { soundFx } from "../utils/sound";
import {
  Compass,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Rocket,
  Activity,
  Layers,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function FlightHistory() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-space-accent text-xs telemetry mb-2">
          <Compass className="w-4 h-4" />
          <span>MODULE // 06</span>
          <span className="text-white/20">|</span>
          <span>ORBITAL FLIGHT CHRONOLOGY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
          FLIGHT HISTORY
        </h1>
        <p className="text-xs sm:text-sm text-space-textMuted font-mono mt-1">
          Chronological record of academic progression, system deployments, and research milestones.
        </p>
      </div>

      {/* Vertical Mission Timeline */}
      <div className="relative border-l border-space-accent/30 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-12">
        {flightHistory.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Orbital Reticle Node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#05070B] border-2 border-space-accent flex items-center justify-center group-hover:scale-125 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-space-accent animate-pulse" />
            </div>

            {/* Timeline Content Card */}
            <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08] group-hover:border-space-accent/40 transition-all">
              {/* Epoch & Flight Code */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-white/[0.06] gap-2">
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-space-accent/15 text-space-accent font-bold border border-space-accent/30">
                    {item.flightCode}
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-white font-semibold">{item.epoch}</span>
                </div>
                <span className="text-xs font-mono text-space-textDim">
                  {item.station}
                </span>
              </div>

              {/* Headline & Role */}
              <h2 className="text-lg sm:text-xl font-bold font-display text-white mb-1">
                {item.headline}
              </h2>
              <p className="text-xs font-mono text-space-accent mb-3">
                {item.role}
              </p>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-space-textMuted leading-relaxed mb-4">
                {item.summary}
              </p>

              {/* Key Milestones List */}
              <div className="space-y-2 mb-4">
                {item.highlights.map((hl, hIdx) => (
                  <div key={hIdx} className="flex items-start space-x-2.5 text-xs text-space-text font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-space-success shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>

              {/* Telemetry Chips */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                {item.telemetryMetrics.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className="px-2 py-0.5 bg-space-elevated border border-white/[0.05] rounded-sm text-[10px] font-mono text-space-textDim"
                  >
                    ● {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Future Orbit Vector */}
      <div className="mt-12 p-6 aerospace-panel rounded-sm border border-white/[0.08] text-center">
        <span className="text-[10px] telemetry text-space-accent block mb-1">
          ORBITAL TRAJECTORY // LOOKING FORWARD
        </span>
        <p className="text-xs sm:text-sm text-space-text font-mono max-w-lg mx-auto">
          Currently charting trajectories in distributed consensus, low-resource semantic retrieval, and high-concurrency systems. Ready for mission collaboration.
        </p>
        <div className="mt-4">
          <Link
            to="/contact"
            onClick={() => soundFx.playClick()}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-space-accent text-[#05070B] font-mono text-xs font-bold rounded-sm hover:bg-[#85e2ff] transition-all"
          >
            <span>ESTABLISH TRANSMISSION</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
