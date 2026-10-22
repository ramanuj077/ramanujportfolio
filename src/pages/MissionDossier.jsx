import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { missions } from "../data/missions";
import { soundFx } from "../utils/sound";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  ShieldCheck,
  Compass,
  ArrowRight
} from "lucide-react";
import { GithubIcon } from "../components/SocialIcons";

export default function MissionDossier() {
  const { slug } = useParams();
  const mission = missions.find((m) => m.slug === slug);

  if (!mission) {
    return <Navigate to="/missions" replace />;
  }

  const { caseStudy } = mission;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top Breadcrumb Nav */}
      <div className="mb-8">
        <Link
          to="/missions"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center space-x-2 text-xs font-mono text-space-accent hover:underline mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO MISSION CONTROL</span>
        </Link>

        {/* Dossier Heading Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs telemetry text-space-accent mb-1">
              <span>{mission.missionCode}</span>
              <span className="text-white/20">|</span>
              <span>TECHNICAL DOSSIER</span>
              <span className="text-white/20">|</span>
              <span className="text-space-success">● {mission.status}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              {mission.title}
            </h1>
            <p className="text-sm font-mono text-space-accent mt-1">
              {mission.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex items-center space-x-3">
            {mission.github && (
              <a
                href={mission.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-space-panel border border-white/[0.1] hover:border-space-accent/50 text-white text-xs font-mono rounded-sm transition-all flex items-center space-x-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>REPOSITORY</span>
              </a>
            )}
            {mission.demo && (
              <a
                href={mission.demo}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-space-accent text-[#05070B] text-xs font-mono font-bold rounded-sm hover:bg-[#85e2ff] transition-all flex items-center space-x-2 shadow-[0_0_15px_rgba(102,217,255,0.25)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LIVE DEMO</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Recruiter 60-Second Executive Summary Card */}
      <div className="aerospace-panel-solid p-6 rounded-sm border border-space-accent/30 mb-10 shadow-[0_0_20px_rgba(102,217,255,0.06)]">
        <div className="flex items-center space-x-2 text-[10px] telemetry text-space-accent mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>RECRUITER / REVIEWER 60-SECOND TELEMETRY SUMMARY</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <span className="text-[10px] font-mono text-space-textDim block mb-1">CORE ROLE</span>
            <span className="text-xs font-mono font-bold text-white">{mission.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-space-textDim block mb-1">SYSTEMS DOMAIN</span>
            <span className="text-xs font-mono text-space-accent">
              {mission.systems.join(" • ")}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-space-textDim block mb-1">KEY RESULT</span>
            <span className="text-xs font-mono text-space-success">{caseStudy.result}</span>
          </div>
        </div>
      </div>

      <div className="space-y-10">
        {/* Section 1: Objective & Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
            <h2 className="telemetry text-xs font-bold text-space-accent mb-3 flex items-center space-x-2">
              <Compass className="w-3.5 h-3.5" />
              <span>MISSION OBJECTIVE</span>
            </h2>
            <p className="text-xs sm:text-sm text-space-text leading-relaxed font-mono">
              {caseStudy.missionObjective}
            </p>
          </div>

          <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
            <h2 className="telemetry text-xs font-bold text-space-warning mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>THE CORE PROBLEM</span>
            </h2>
            <p className="text-xs sm:text-sm text-space-textMuted leading-relaxed">
              {caseStudy.problem}
            </p>
          </div>
        </div>

        {/* Section 2: Technical Approach */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h2 className="telemetry text-xs font-bold text-space-accent mb-3">
            TECHNICAL APPROACH & SYSTEM DESIGN
          </h2>
          <p className="text-xs sm:text-sm text-space-text leading-relaxed font-mono mb-6">
            {caseStudy.approach}
          </p>

          {/* Architecture Pipeline Topology */}
          <div className="p-4 bg-space-elevated rounded-sm border border-white/[0.06]">
            <span className="text-[10px] telemetry text-space-accent block mb-3">
              SUBSYSTEM TOPOLOGY & DATA FLOW
            </span>
            <div className="space-y-2.5">
              {caseStudy.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs font-mono">
                  <span className="px-1.5 py-0.5 rounded bg-space-accent/15 text-space-accent text-[10px] shrink-0 font-bold">
                    0{idx + 1}
                  </span>
                  <span className="text-space-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: Engineering Challenges & Key Decisions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
            <h3 className="telemetry text-xs font-bold text-space-warning mb-4">
              CRITICAL ENGINEERING CHALLENGES
            </h3>
            <div className="space-y-3">
              {caseStudy.engineeringChallenges.map((challenge, idx) => (
                <div key={idx} className="p-3 bg-space-elevated rounded-sm border border-white/[0.04] text-xs leading-relaxed text-space-textMuted">
                  <span className="text-space-warning font-mono font-bold block mb-1">
                    CHALLENGE // 0{idx + 1}
                  </span>
                  {challenge}
                </div>
              ))}
            </div>
          </div>

          <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
            <h3 className="telemetry text-xs font-bold text-space-accent mb-4">
              KEY ARCHITECTURAL DECISIONS
            </h3>
            <div className="space-y-3">
              {caseStudy.keyDecisions.map((decision, idx) => (
                <div key={idx} className="p-3 bg-space-elevated rounded-sm border border-white/[0.04] text-xs leading-relaxed text-space-text">
                  <span className="text-space-accent font-mono font-bold block mb-1">
                    DECISION // 0{idx + 1}
                  </span>
                  {decision}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 4: What I Learned */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h3 className="telemetry text-xs font-bold text-space-success mb-3 flex items-center space-x-2">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>POST-MISSION RETROSPECTIVE & LESSONS LEARNED</span>
          </h3>
          <p className="text-xs sm:text-sm text-space-text leading-relaxed font-mono">
            "{caseStudy.whatILearned}"
          </p>
        </div>

        {/* Section 5: Technologies Manifest */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <span className="telemetry text-[10px] text-space-textDim block mb-3">
            DEPLOYED TECHNOLOGIES & PACKAGES
          </span>
          <div className="flex flex-wrap gap-2">
            {mission.technologies.map((t) => (
              <span
                key={t}
                className="px-3 py-1 bg-space-elevated border border-white/[0.08] rounded-sm text-xs font-mono text-space-accent"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation to Other Missions */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            to="/missions"
            onClick={() => soundFx.playClick()}
            className="text-xs font-mono text-space-textMuted hover:text-white flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL MISSIONS</span>
          </Link>

          <Link
            to="/research"
            onClick={() => soundFx.playClick()}
            className="text-xs font-mono text-space-accent hover:underline flex items-center space-x-1"
          >
            <span>EXPLORE RESEARCH LAB</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
