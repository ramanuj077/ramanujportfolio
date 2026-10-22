import React from "react";
import { Link } from "react-router-dom";
import { soundFx } from "../utils/sound";
import {
  User,
  GraduationCap,
  ArrowRight,
  ArrowUpRight
} from "lucide-react";
import { GithubIcon, LinkedInIcon } from "../components/SocialIcons";

export default function CrewModule() {
  const exploringTopics = [
    "Artificial Intelligence",
    "Machine Learning",
    "Backend Systems",
    "System Design",
    "Research",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      {/* ── Section Header ────────────────────────────────────── */}
      <header className="mb-12 pb-8 border-b border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span>ABOUT // PROFILE</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">SRMIST · CSE 2025–2029</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          A. Ramanuj Patro
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-sans mt-2 max-w-2xl leading-relaxed">
          Student engineer exploring artificial intelligence, scalable software systems, and research.
        </p>
      </header>

      {/* ── Main Two-Column Layout ────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Portrait & Quick Snapshot (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-6 shadow-2xl relative overflow-hidden">
            {/* Cropped Lofi Developer Artwork */}
            <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border border-white/[0.08] shadow-inner mb-6 group">
              <img
                src="/ramanuj-profile.png"
                alt="Ramanuj at his developer desk"
                className="w-full h-full object-cover object-top filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-transparent to-transparent opacity-60 pointer-events-none" />

              {/* Status pill overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono bg-[#0c1017]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>DEEP FOCUS ACTIVE</span>
                </span>
                <span className="text-slate-400">SRMIST</span>
              </div>
            </div>

            {/* Quick Officer Identity Details */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5">
                  Full Name
                </span>
                <span className="text-base font-bold text-white font-display">
                  A. Ramanuj Patro
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-0.5">
                  Education &amp; Cadence
                </span>
                <div className="flex items-start space-x-2 pt-1">
                  <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block text-xs">
                      SRM Institute of Science &amp; Technology
                    </span>
                    <span className="text-slate-400 text-[11px] block">
                      B.Tech in Computer Science and Engineering
                    </span>
                    <span className="text-cyan-400 text-[10px] block mt-0.5 font-bold">
                      2025 — 2029
                    </span>
                  </div>
                </div>
              </div>

              {/* Mission Statement Pill */}
              <div className="p-3.5 rounded-xl bg-[#131926] border border-cyan-500/20 text-slate-200">
                <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                  CORE MISSION
                </span>
                <p className="text-sm font-display font-bold text-white">
                  Build. Experiment. Learn. Repeat.
                </p>
              </div>

              {/* Quick Links */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">Connect:</span>
                <div className="flex items-center space-x-3 text-slate-300">
                  <a
                    href="https://github.com/ramanuj077"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors p-1"
                    title="GitHub"
                  >
                    <GithubIcon size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ramanujpatro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors p-1"
                    title="LinkedIn"
                  >
                    <LinkedInIcon size={16} />
                  </a>
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-[11px] font-bold text-cyan-400 hover:underline pl-1"
                  >
                    Resume <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentic Story & Bio (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Story Container */}
          <div className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-7 sm:p-9 shadow-xl relative">
            <h2 className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-400 mb-6 flex items-center space-x-2">

              <span>THE BUILDER'S JOURNEY</span>
            </h2>

            <div className="space-y-5 text-slate-200 font-sans text-sm sm:text-base leading-relaxed">
              <p>
                I'm a Computer Science Engineering student at SRM Institute of Science &amp; Technology, currently exploring the intersection of <strong className="text-white font-semibold">Artificial Intelligence, software engineering, and research</strong>.
              </p>

              <p>
                I like building things that move beyond the idea stage — from AI-powered products and backend systems to machine learning experiments and research projects. I'm particularly interested in understanding how intelligent systems work, how large software systems are designed, and how ideas can be turned into reliable, usable products.
              </p>

              <p>
                My journey so far has taken me across <strong className="text-white font-semibold">AI/ML, full-stack development, backend engineering, NLP, computer vision, and research</strong>. Along the way, I've worked on projects ranging from operational intelligence platforms and research-paper recommendation systems to AI-powered applications and automation tools.
              </p>

              <p>
                I'm still exploring the vast field of computer science, and that's something I genuinely enjoy. Rather than limiting myself to one specialization too early, I'm focused on building strong fundamentals, working on challenging problems, and discovering where I can create the most meaningful impact.
              </p>
            </div>

            {/* Currently Exploring Section */}
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-3">
                CURRENTLY EXPLORING:
              </span>
              <div className="flex flex-wrap gap-2">
                {exploringTopics.map((topic) => (
                  <span
                    key={topic}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Navigation Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/missions"
              onClick={() => soundFx.playClick()}
              className="p-5 rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-cyan-400/40 transition-all group block"
            >
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                Engineered Works
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  View Featured Projects
                </span>
                <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/logs"
              onClick={() => soundFx.playClick()}
              className="p-5 rounded-2xl bg-[#0c1017] border border-white/[0.08] hover:border-amber-400/40 transition-all group block"
            >
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                Written Thoughts
              </span>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  Read Field Notebooks
                </span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
