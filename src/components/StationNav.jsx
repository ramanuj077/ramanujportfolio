import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { soundFx } from "../utils/sound";
import { Menu, X, Download, Terminal } from "lucide-react";

const navLinks = [
  { path: "/missions", label: "Missions" },
  { path: "/logs",     label: "Blogs" },
  { path: "/about",    label: "About" },
  { path: "/contact",  label: "Contact" },
];

export default function StationNav({ onOpenTerminal }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "nav-glass shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[60px] flex items-center justify-between">

        {/* ── Brand ────────────────────────────────── */}
        <Link
          to="/"
          onClick={() => soundFx.playClick()}
          className="flex items-center group focus:outline-none"
        >
          <span className="font-display font-bold text-sm tracking-widest text-white group-hover:text-[#64DCFF] transition-colors">
            RAMANUJ
          </span>
        </Link>

        {/* ── Desktop Nav ──────────────────────────── */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
          {navLinks.map(({ path, label }) => {
            const active = location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={() => soundFx.playClick()}
                className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                  active
                    ? "text-[#64DCFF] bg-[#64DCFF]/10 border border-[#64DCFF]/30"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#64DCFF] shadow-[0_0_6px_#64DCFF]" />
                )}
              </Link>
            );
          })}

          <button
            onClick={() => { soundFx.playClick(); onOpenTerminal?.(); }}
            className="ml-1 px-3 py-1.5 rounded-full border border-cyan-500/20 hover:border-cyan-400/50 bg-cyan-950/20 text-[#64DCFF] text-xs font-mono flex items-center gap-1.5 transition-all"
            title="Open Interactive CLI (`)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </button>

          <a
            href="/resume.pdf"
            download="Ramanuj_Resume.pdf"
            onClick={() => soundFx.playClick()}
            className="ml-1 btn-primary !py-2 !px-4 !text-xs !rounded-full !gap-1.5"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* ── Mobile Toggle ─────────────────────── */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Drawer ────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden nav-glass border-t border-white/[0.06] px-6 py-5 space-y-2">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => { soundFx.playClick(); setMobileOpen(false); }}
              className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                location.pathname.startsWith(path)
                  ? "bg-[#64DCFF]/10 text-[#64DCFF] border border-[#64DCFF]/25"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            download="Ramanuj_Resume.pdf"
            onClick={() => { soundFx.playClick(); setMobileOpen(false); }}
            className="btn-primary !py-2.5 !w-full justify-center mt-2"
          >
            <span>Resume</span>
            <Download className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
}
