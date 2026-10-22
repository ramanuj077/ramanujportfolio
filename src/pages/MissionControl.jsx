import React from "react";
import { missions } from "../data/missions";
import { soundFx } from "../utils/sound";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

export default function MissionControl() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      {/* ── Clean Header ──────────────────────────────────────── */}
      <header className="mb-12 pb-8 border-b border-white/[0.08]">
        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Projects
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-sans mt-2 max-w-2xl leading-relaxed">
          Production platforms, compilers, AI research engines, and distributed architectures.
          Each project links directly to its live application or open-source codebase.
        </p>
      </header>

      {/* ── Projects Grid ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className="group rounded-2xl bg-[#0c1017] hover:bg-[#101520] border border-white/[0.08] hover:border-cyan-400/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/20 relative"
          >
            {/* Top row: Category tag & Status Badge */}
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  {mission.systems[0] || "ENGINEERING"}
                </span>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold flex items-center space-x-1.5 ${
                      mission.status === "ACTIVE"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : mission.status === "DEPLOYED"
                        ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                        : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    <span>{mission.status}</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {mission.timeline}
                  </span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="text-2xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors leading-snug mb-1">
                {mission.title}
              </h2>
              <p className="text-xs font-mono text-cyan-300/80 mb-3.5 leading-relaxed">
                {mission.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm font-sans text-slate-300/90 leading-relaxed mb-5">
                {mission.brief}
              </p>

              {/* Architecture Highlight (Refined, Clean Callout) */}
              <div className="p-3.5 rounded-xl bg-[#131826] border-l-2 border-cyan-400 border-y border-r border-white/[0.04] mb-6">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  Key Architecture Highlight
                </span>
                <p className="text-xs font-mono text-slate-300 leading-relaxed">
                  {mission.architectureHighlight}
                </p>
              </div>
            </div>

            {/* Bottom: Tech Stack & Direct Website Actions */}
            <div>
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {mission.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] font-mono text-slate-400 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons: Direct to Website & GitHub */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                {/* GitHub Code */}
                {mission.github && (
                  <a
                    href={mission.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors py-2 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08]"
                  >
                    <GithubIcon size={13} />
                    <span>Source</span>
                  </a>
                )}

                {/* Direct Live Website Link */}
                <a
                  href={mission.liveUrl || mission.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="flex-1 flex items-center justify-center space-x-1.5 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 transition-all py-2 px-4 rounded-xl shadow-md shadow-cyan-400/20 group/btn"
                >
                  <span>Visit Website</span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
