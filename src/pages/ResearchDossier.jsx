import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { researchProjects } from "../data/research";
import { soundFx } from "../utils/sound";
import {
  ArrowLeft,
  FlaskConical,
  BookOpen,
  Activity,
  CheckCircle2,
  FileCode,
  ArrowRight
} from "lucide-react";

export default function ResearchDossier() {
  const { slug } = useParams();
  const project = researchProjects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/research" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back to Lab Link */}
      <Link
        to="/research"
        onClick={() => soundFx.playClick()}
        className="inline-flex items-center space-x-2 text-xs font-mono text-space-accent hover:underline mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>RETURN TO RESEARCH LAB</span>
      </Link>

      {/* Lab Header */}
      <div className="pb-6 mb-8 border-b border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs telemetry text-space-accent mb-2">
          <span>{project.investigationCode}</span>
          <span className="text-white/20">|</span>
          <span>LABORATORY REPORT</span>
          <span className="text-white/20">|</span>
          <span className="text-space-warning">● {project.status}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight">
          {project.title}
        </h1>
        <p className="text-sm font-mono text-space-accent mt-1">
          {project.subtitle}
        </p>
      </div>

      <div className="space-y-8 font-mono text-xs">
        {/* Research Question Banner */}
        <div className="aerospace-panel-solid p-6 rounded-sm border border-space-accent/30">
          <span className="text-[10px] telemetry text-space-accent block mb-2 font-bold">
            HYPOTHESIS & SCIENTIFIC QUESTION
          </span>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            "{project.researchQuestion}"
          </p>
        </div>

        {/* Abstract */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h2 className="telemetry text-xs font-bold text-space-accent mb-3">
            INVESTIGATION ABSTRACT
          </h2>
          <p className="text-xs sm:text-sm text-space-textMuted leading-relaxed font-sans">
            {project.abstract}
          </p>
        </div>

        {/* Experimental Protocol / Approach */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h2 className="telemetry text-xs font-bold text-space-accent mb-4">
            EXPERIMENTAL APPROACH & PROTOCOL
          </h2>
          <div className="space-y-3">
            {project.approach.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-3 p-3 bg-space-elevated rounded-sm border border-white/[0.04]">
                <span className="px-2 py-0.5 rounded bg-space-accent/15 text-space-accent text-[10px] font-bold shrink-0">
                  STEP 0{idx + 1}
                </span>
                <span className="text-space-text leading-relaxed font-sans text-xs">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h2 className="telemetry text-xs font-bold text-space-success mb-3 flex items-center space-x-2">
            <Activity className="w-3.5 h-3.5 text-space-success" />
            <span>MEASURED FINDINGS & LAB TELEMETRY</span>
          </h2>
          <p className="text-xs sm:text-sm text-space-text leading-relaxed font-sans">
            {project.findings}
          </p>
        </div>

        {/* References */}
        <div className="aerospace-panel p-6 rounded-sm border border-white/[0.08]">
          <h3 className="telemetry text-xs font-bold text-space-textDim mb-3 flex items-center space-x-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ACADEMIC REFERENCES & FOUNDATIONAL CITATIONS</span>
          </h3>
          <ul className="space-y-2 text-space-textMuted text-[11px]">
            {project.references.map((ref, idx) => (
              <li key={idx} className="pl-3 border-l border-white/[0.1] leading-relaxed">
                [{idx + 1}] {ref}
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Nav */}
        <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between">
          <Link
            to="/research"
            onClick={() => soundFx.playClick()}
            className="text-space-textMuted hover:text-white flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ALL INVESTIGATIONS</span>
          </Link>
          <Link
            to="/logs"
            onClick={() => soundFx.playClick()}
            className="text-space-accent hover:underline flex items-center space-x-1"
          >
            <span>MISSION LOG FLIGHT ARCHIVE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
