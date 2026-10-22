import React from "react";
import { Link } from "react-router-dom";
import { crewProfile } from "../data/profile";
import { soundFx } from "../utils/sound";
import { Mail, ArrowUp } from "lucide-react";

const navLinks = [
  { path: "/missions",      label: "Missions"      },
  { path: "/research",      label: "Research"      },
  { path: "/logs",          label: "Mission Logs"  },
  { path: "/about",         label: "About"         },
  { path: "/contact",       label: "Contact"       },
  { path: "/resume.pdf",   label: "Resume", download: "Ramanuj_Resume.pdf" },
];

export default function StationFooter() {
  const scrollToTop = () => {
    soundFx.playClick?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 w-full mt-16">
      {/* top glow divider */}
      <div className="hr-glow" />

      <div
        className="w-full"
        style={{
          background: "rgba(3,5,10,0.80)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
            {/* Brand col */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="font-display font-bold text-sm tracking-widest text-white">RAMANUJ</span>
              </div>
              <p className="text-slate-500 text-[12px] leading-relaxed max-w-[220px]">
                Computer Science Engineer @ SRMIST. Building AI systems and scalable backend infrastructure.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-2.5">
                <a
                  href={crewProfile.links.github}
                  target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] hover:border-[#64DCFF]/40 text-slate-500 hover:text-[#64DCFF] flex items-center justify-center transition-all"
                  title="GitHub"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={crewProfile.links.linkedin}
                  target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-lg border border-white/[0.08] hover:border-[#64DCFF]/40 text-slate-500 hover:text-[#64DCFF] flex items-center justify-center transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href={`mailto:${crewProfile.links.email}`}
                  className="w-8 h-8 rounded-lg border border-white/[0.08] hover:border-[#64DCFF]/40 text-slate-500 hover:text-[#64DCFF] flex items-center justify-center transition-all"
                  title="Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Nav links */}
            <div className="space-y-3">
              <p className="font-mono text-[10px] text-[#64DCFF]/60 tracking-widest uppercase mb-4">Navigation</p>
              {navLinks.slice(0, 3).map(({ path, label, download }) =>
                download ? (
                  <a key={path} href={path} download={download}
                    className="block font-sans text-[13px] text-slate-400 hover:text-[#64DCFF] transition-colors">
                    {label}
                  </a>
                ) : (
                  <Link key={path} to={path} onClick={() => soundFx.playClick?.()}
                    className="block font-sans text-[13px] text-slate-400 hover:text-[#64DCFF] transition-colors">
                    {label}
                  </Link>
                )
              )}
            </div>

            <div className="space-y-3">
              <p className="font-mono text-[10px] text-[#64DCFF]/60 tracking-widest uppercase mb-4">More</p>
              {navLinks.slice(3).map(({ path, label, download }) =>
                download ? (
                  <a key={path} href={path} download={download}
                    className="block font-sans text-[13px] text-slate-400 hover:text-[#64DCFF] transition-colors">
                    {label}
                  </a>
                ) : (
                  <Link key={path} to={path} onClick={() => soundFx.playClick?.()}
                    className="block font-sans text-[13px] text-slate-400 hover:text-[#64DCFF] transition-colors">
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[10px] text-slate-600">
              © {new Date().getFullYear()} Ramanuj — All systems nominal.
            </span>
            <div className="flex items-center gap-3 text-slate-600 font-mono text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FFFA0] shadow-[0_0_6px_#4FFFA0]" />
                ORBITAL // RS-01
              </span>
              <button
                onClick={scrollToTop}
                title="Back to top"
                className="p-1.5 rounded-md border border-white/[0.06] hover:border-[#64DCFF]/40 hover:text-[#64DCFF] transition-all"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
