import React, { useState } from "react";
import { Link } from "react-router-dom";
import { researchProjects } from "../data/research";
import { soundFx } from "../utils/sound";
import {
  FlaskConical,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Activity,
  Layers,
  Terminal,
  FileText
} from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

export default function ResearchLab() {
  const [activeTab, setActiveTab] = useState("ALL");

  const filteredProjects = researchProjects.filter((r) => {
    if (activeTab === "ALL") return true;
    return r.status.toUpperCase() === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-space-accent text-xs telemetry mb-2">
          <FlaskConical className="w-4 h-4" />
          <span>MODULE // 03</span>
          <span className="text-white/20">|</span>
          <span>ORBITAL SCIENTIFIC INVESTIGATION SUITE</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              RESEARCH LAB
            </h1>
            <p className="text-xs sm:text-sm text-space-textMuted font-mono mt-1">
              CURRENT INVESTIGATIONS // Information Retrieval, Agent Consensus & Network Dynamics
            </p>
          </div>

          {/* Status Filter Badges */}
          <div className="flex items-center space-x-2">
            {["ALL", "EXPERIMENTING", "ACTIVE", "ARCHIVED"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab(tab);
                }}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all ${
                  activeTab === tab
                    ? "bg-space-accent text-[#05070B] font-bold"
                    : "bg-space-panel text-space-textMuted border border-white/[0.06] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Banner / Methodology Note */}
      <div className="p-4 bg-[#09111A] border-l-2 border-space-accent rounded-sm mb-10 flex items-center justify-between">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <Activity className="w-4 h-4 text-space-accent animate-pulse" />
          <span className="text-space-text">
            SCIENTIFIC CADENCE: All experiments are benchmarked empirically with reproducible codebases and explicit mathematical evaluation metrics.
          </span>
        </div>
        <span className="text-[10px] telemetry text-space-textDim hidden md:inline">
          LAB PRECISION: HIGH
        </span>
      </div>

      {/* Research Investigations List */}
      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="aerospace-panel rounded-sm border border-white/[0.08] p-6 hover:border-space-accent/40 transition-all"
          >
            {/* Top Meta Line */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-white/[0.06] gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-space-accent/15 text-space-accent text-xs font-mono font-bold border border-space-accent/30">
                  {project.investigationCode}
                </span>
                <span className="text-white/20">|</span>
                <span className="text-xs font-mono text-space-textMuted">
                  FOCUS: {project.focus}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1 ${
                    project.status === "EXPERIMENTING"
                      ? "bg-space-warning/15 text-space-warning border border-space-warning/30"
                      : project.status === "ACTIVE"
                      ? "bg-space-success/15 text-space-success border border-space-success/30"
                      : "bg-white/[0.08] text-space-textMuted border border-white/[0.1]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                  <span>{project.status}</span>
                </span>
                <span className="text-xs font-mono text-space-textDim">{project.date}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-1">
              {project.title}
            </h2>
            <p className="text-xs font-mono text-space-accent mb-4">
              {project.subtitle}
            </p>

            {/* Research Question Card */}
            <div className="p-4 bg-space-elevated rounded-sm border border-white/[0.05] mb-5">
              <span className="text-[10px] telemetry text-space-textDim block mb-1">
                CORE INVESTIGATION HYPOTHESIS & QUESTION
              </span>
              <p className="text-xs sm:text-sm text-space-text font-mono leading-relaxed">
                "{project.researchQuestion}"
              </p>
            </div>

            {/* Abstract */}
            <p className="text-xs sm:text-sm text-space-textMuted leading-relaxed mb-5">
              {project.abstract}
            </p>

            {/* Empirical Findings Box */}
            <div className="p-4 bg-[#0B1520] border-l-2 border-space-success/70 rounded-sm mb-5 text-xs font-mono">
              <span className="telemetry text-[10px] text-space-success block mb-1 font-bold">
                EMPIRICAL FINDINGS & OBSERVATIONS
              </span>
              <p className="text-space-text leading-relaxed">
                {project.findings}
              </p>
            </div>

            {/* Bottom Actions & References */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-xs font-mono">
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-space-textMuted hover:text-space-accent transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>CODE HARNESS</span>
                  </a>
                )}
                <span className="text-space-textDim text-[11px]">
                  STATUS: {project.paperStatus}
                </span>
              </div>

              <Link
                to={`/research/${project.slug}`}
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-space-accent hover:underline"
              >
                <span>OPEN LABORATORY DOSSIER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
