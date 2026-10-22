import React from "react";
import { crewProfile } from "../data/profile";
import { missions } from "../data/missions";
import { systemCategories } from "../data/skills";
import { soundFx } from "../utils/sound";
import {
  FileText,
  Download,
  Printer,
  ExternalLink,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Compass
} from "lucide-react";

export default function MissionDossierResume() {
  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center space-x-2 text-space-accent text-xs telemetry mb-2">
            <FileText className="w-4 h-4" />
            <span>MODULE // 07</span>
            <span className="text-white/20">|</span>
            <span>OFFICIAL MISSION DOSSIER & CURRICULUM VITAE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            MISSION DOSSIER
          </h1>
          <p className="text-xs sm:text-sm text-space-accent font-mono mt-1">
            CREW MEMBER // 001 SPECIFICATION SHEET
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-space-panel border border-white/[0.1] hover:border-space-accent/50 text-white text-xs font-mono rounded-sm transition-all flex items-center space-x-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT DOSSIER</span>
          </button>

          <a
            href={crewProfile.links.resume}
            target="_blank"
            rel="noreferrer"
            download="A_Ramanuj_Patro_Mission_Dossier.pdf"
            className="px-4 py-2 bg-space-accent text-[#05070B] text-xs font-mono font-bold rounded-sm hover:bg-[#85e2ff] transition-all flex items-center space-x-2 shadow-[0_0_15px_rgba(102,217,255,0.25)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD DOSSIER (PDF)</span>
          </a>
        </div>
      </div>

      {/* Main Printable Technical Specification Sheet */}
      <div className="aerospace-panel-solid p-8 rounded-sm border border-space-accent/30 shadow-[0_0_30px_rgba(102,217,255,0.06)] space-y-8 font-mono text-xs">
        {/* Identity & Header Telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-6 border-b border-white/[0.1] gap-4">
          <div>
            <div className="telemetry text-space-accent text-[11px] mb-1 font-bold">
              ORBITAL // RS-01 DOSSIER SPECIFICATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
              {crewProfile.fullName}
            </h2>
            <div className="text-space-accent text-xs mt-1">
              DISCIPLINE: COMPUTER SCIENCE ENGINEERING
            </div>
            <div className="text-space-textMuted text-[11px] mt-0.5">
              FOCUS: AI / ML • SOFTWARE ENGINEERING • BACKEND SYSTEMS • RESEARCH
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1 text-space-textMuted text-[11px]">
            <div>EMAIL: {crewProfile.links.email}</div>
            <div>LOCATION: SRMIST Kattankulathur, Chennai, IN</div>
            <div>STATUS: SYSTEMS NOMINAL [ACTIVE FLIGHT CADENCE]</div>
          </div>
        </div>

        {/* Education Credentials */}
        <div>
          <h3 className="telemetry text-xs font-bold text-space-accent mb-3 flex items-center space-x-2">
            <GraduationCap className="w-4 h-4" />
            <span>ACADEMIC FOUNDATION & DEGREE</span>
          </h3>
          <div className="p-4 bg-space-elevated rounded-sm border border-white/[0.05]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <span className="font-bold text-white text-sm">
                SRM Institute of Science & Technology
              </span>
              <span className="text-space-accent text-xs">{crewProfile.education.period}</span>
            </div>
            <span className="text-space-text text-xs block mt-0.5">
              Bachelor of Technology (B.Tech) in Computer Science and Engineering
            </span>
            <span className="text-space-textDim text-[11px] block mt-1">
              Coursework: Data Structures & Algorithms, Object-Oriented Programming (Java/C++), Computer Organization & Architecture, Discrete Mathematics, Operating Systems, Database Management Systems.
            </span>
          </div>
        </div>

        {/* Core Systems Competencies */}
        <div>
          <h3 className="telemetry text-xs font-bold text-space-accent mb-3 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>ENGINEERING & SUBSYSTEM COMPETENCIES</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systemCategories.slice(0, 4).map((sys) => (
              <div key={sys.id} className="p-3 bg-space-elevated rounded-sm border border-white/[0.04]">
                <span className="text-space-accent font-bold text-xs block mb-1">
                  {sys.name}
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {sys.skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2 py-0.5 bg-space-panel rounded-sm text-[10px] text-space-text border border-white/[0.06]"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Mission Payloads (Projects) */}
        <div>
          <h3 className="telemetry text-xs font-bold text-space-accent mb-3 flex items-center space-x-2">
            <Compass className="w-4 h-4" />
            <span>SELECTED MISSIONS & PRODUCTION ARCHITECTURES</span>
          </h3>
          <div className="space-y-4">
            {missions.map((m) => (
              <div key={m.id} className="p-4 bg-space-elevated rounded-sm border border-white/[0.04]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-white text-sm">{m.title}</span>
                    <span className="text-space-textDim text-xs">• {m.tagline}</span>
                  </div>
                  <span className="text-space-accent text-xs">{m.timeline}</span>
                </div>
                <p className="text-space-textMuted text-xs leading-relaxed mb-2 font-sans">
                  {m.brief}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {m.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 bg-space-panel rounded text-[9px] text-space-accent border border-white/[0.05]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Footer */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-[11px] text-space-textDim">
          <span>STATION VERIFICATION: ORBITAL // RS-01</span>
          <span>AUTHENTICATED BY: A. RAMANUJ PATRO</span>
        </div>
      </div>
    </div>
  );
}
