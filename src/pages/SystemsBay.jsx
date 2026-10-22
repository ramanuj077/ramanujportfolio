import React, { useState } from "react";
import { systemCategories } from "../data/skills";
import { soundFx } from "../utils/sound";
import {
  Cpu,
  Terminal,
  Activity,
  Layers,
  CheckCircle2,
  Database,
  Globe,
  GitBranch,
  Radio,
  Compass
} from "lucide-react";

export default function SystemsBay() {
  const [selectedSubsystem, setSelectedSubsystem] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-space-accent text-xs telemetry mb-2">
          <Cpu className="w-4 h-4" />
          <span>MODULE // 05</span>
          <span className="text-white/20">|</span>
          <span>ORBITAL AVIONICS & SUBSYSTEMS BAY</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              SYSTEMS BAY
            </h1>
            <p className="text-xs sm:text-sm text-space-textMuted font-mono mt-1">
              Station software architecture, machine learning engines, and data bus subsystems.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs telemetry">
            <span className="px-3 py-1 bg-space-panel border border-space-success/30 text-space-success rounded-sm flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-space-success animate-pulse" />
              <span>SUBSYSTEM BUS: 100% OPERATIONAL</span>
            </span>
          </div>
        </div>
      </div>

      {/* Systems Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemCategories.map((system) => (
          <div
            key={system.id}
            className="aerospace-panel rounded-sm border border-white/[0.08] hover:border-space-accent/40 p-6 flex flex-col justify-between transition-all"
          >
            <div>
              {/* Subsystem Code & Status */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-space-accent/15 text-space-accent text-xs font-mono font-bold border border-space-accent/30">
                    {system.subsystemCode}
                  </span>
                  <span className="text-[10px] font-mono text-space-textDim">
                    {system.telemetry}
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono font-bold flex items-center space-x-1 ${
                    system.status === "OPTIMAL" || system.status === "ACTIVE"
                      ? "text-space-success"
                      : system.status === "INGESTING"
                      ? "text-space-accent"
                      : "text-space-warning"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{system.status}</span>
                </span>
              </div>

              {/* Subsystem Title & Description */}
              <h2 className="text-lg font-bold font-display text-white mb-1">
                {system.name}
              </h2>
              <p className="text-xs text-space-textMuted leading-relaxed mb-6 font-mono">
                {system.description}
              </p>

              {/* Skills Interactive Badges */}
              <div className="space-y-2.5">
                {system.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-3 bg-space-elevated rounded-sm border border-white/[0.05] hover:border-space-accent/30 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-bold text-white group-hover:text-space-accent transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[9px] telemetry text-space-accent px-1.5 py-0.5 rounded bg-space-accent/10 border border-space-accent/20">
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-space-textMuted leading-snug">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Subsystem Status Strip */}
            <div className="pt-4 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[10px] telemetry text-space-textDim">
              <span>DIAGNOSTIC: VERIFIED</span>
              <span className="text-space-accent">READY FOR DISPATCH</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
