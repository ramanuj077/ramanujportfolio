import React, { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { missions } from "../data/missions";
import CommandDeckHero from "../components/CommandDeckHero";
import { ArrowRight, ChevronRight, ExternalLink, BookOpen, Award, Rocket, Trophy, Medal, FileBadge, Users } from "lucide-react";

/* ── status colour map ───────────────────────────────────── */
const S = {
  ACTIVE: { bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.30)", text: "#00ff88" },
  EXPERIMENTAL: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.28)", text: "#f59e0b" },
  DEPLOYED: { bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.28)", text: "#00d4ff" },
  RESEARCH: { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.28)", text: "#8b5cf6" },
};

function StatusBadge({ status }) {
  const s = S[status] || S.EXPERIMENTAL;
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.text,
      fontFamily: "'JetBrains Mono',monospace", fontSize: 9, fontWeight: 700,
      letterSpacing: "0.12em", padding: "3px 10px", borderRadius: 3,
      textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 5
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.text, display: "inline-block" }} />
      {status}
    </span>
  );
}

/* ── section header ──────────────────────────────────────── */
function SectionHeader({ eyebrow, title, action }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 40, gap: 16, flexWrap: "wrap" }}>
      <div>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(0,212,255,0.65)", letterSpacing: "0.16em", textTransform: "uppercase", margin: "0 0 8px" }}>{eyebrow}</p>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,40px)", color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{title}</h2>
      </div>
      {action && (
        <Link to={action.href} onClick={() => soundFx.playClick?.()}
          style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(0,212,255,0.7)", border: "1px solid rgba(0,212,255,0.2)", padding: "8px 14px", borderRadius: 6, transition: "all 0.2s ease", textDecoration: "none", letterSpacing: "0.08em" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.55)"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.background = "rgba(0,212,255,0.05)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; e.currentTarget.style.color = "rgba(0,212,255,0.7)"; e.currentTarget.style.background = "transparent"; }}
        >
          {action.label} <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

/* ── 3D tilt project card ────────────────────────────────── */
function MissionCard({ mission, index }) {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{ display: "flex", flexDirection: "column", height: "100%", transition: "transform 0.15s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}
    >
      {/* Top accent */}
      <div style={{ height: 2, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)", opacity: 0, transition: "opacity 0.3s ease" }}
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
      />

      <div style={{ padding: "24px 24px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(0,212,255,0.7)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>
            {mission.systems?.[0] || "ENGINEERING"}
          </span>
          <StatusBadge status={mission.status} />
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: 22, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
          onMouseLeave={e => e.currentTarget.style.color = "#fff"}
        >
          {mission.title}
        </h3>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(0,212,255,0.6)", margin: "0 0 14px" }}>{mission.tagline}</p>
        <p style={{ fontSize: 13, color: "rgba(200,215,235,0.62)", lineHeight: 1.7, flex: 1, margin: "0 0 18px" }}>{mission.brief}</p>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {(mission.technologies || []).slice(0, 5).map(t => (
            <span key={t} style={{ padding: "3px 9px", fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "rgba(148,163,184,0.7)", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4 }}>{t}</span>
          ))}
        </div>

        {/* Footer */}
        <div style={{ paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to={`/missions/${mission.slug}`} onClick={() => soundFx.playClick?.()}
            style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono',monospace", fontSize: 11, fontWeight: 700, color: "rgba(0,212,255,0.8)", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={e => e.currentTarget.style.color = "#fff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(0,212,255,0.8)"}
          >
            Case Study <ArrowRight size={13} />
          </Link>
          {mission.github && (
            <a href={mission.github} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, fontFamily: "'JetBrains Mono',monospace", color: "rgba(100,116,139,0.7)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(100,116,139,0.7)"}
            >
              <ExternalLink size={12} /> GitHub
            </a>
          )}
        </div>
      </div>

      {/* Bottom glow line on hover */}
      <div style={{ height: 2, width: "0%", background: "linear-gradient(90deg, rgba(0,212,255,0) 0%, #00d4ff 50%, rgba(0,212,255,0) 100%)", transition: "width 0.5s ease", borderRadius: "0 0 14px 14px" }}
        className="card-glow-line"
      />
    </motion.div>
  );
}

/* ── The Big 6: Accreditations & Recognitions ───────────── */
const BIG_SIX = [
  {
    id: "01",
    label: "AI FOUNDATIONS // ORACLE",
    name: "Oracle Cloud Infrastructure 2025 – Certified AI Foundations Associate",
    issuer: "Oracle Cloud Infrastructure",
    year: "2025",
    color: "#f97316",
    context: "Formal cloud credential validating foundational mastery in AI, machine learning, and enterprise OCI infrastructure.",
    icon: Award,
  },
  {
    id: "02",
    label: "SPACE SYSTEMS // ISRO",
    name: "Bharatiya Antariksh Hackathon 2026",
    issuer: "Indian Space Research Organisation (ISRO)",
    year: "2026",
    color: "#00d4ff",
    context: "Selected for ISRO's national space hackathon, engineering space systems and mission-grade software.",
    icon: Rocket,
  },
  {
    id: "03",
    label: "COMPETITION // IIT BOMBAY",
    name: "Upskill India Challenge Finalist",
    issuer: "Techfest, IIT Bombay",
    year: "2024",
    color: "#a855f7",
    context: "National finalist at Asia's largest annual science and technology festival at IIT Bombay.",
    icon: Trophy,
  },
  {
    id: "04",
    label: "MISSION // 2ND PLACE",
    name: "Confluence 1.0 Hackathon — 2nd Position",
    issuer: "Unstop",
    year: "2024",
    color: "#00ff88",
    project: "Synapse — AI Code Refactoring Assistant",
    context: "Awarded 2nd place nationwide building Synapse, an AI assistant analyzing codebases and automating refactoring.",
    icon: Medal,
  },
  {
    id: "05",
    label: "RECOGNITION // HACKERRANK",
    name: "Letter of Recognition from Founder & CTO",
    issuer: "HackerRank",
    year: "2024",
    color: "#38bdf8",
    context: "Official commendation from HackerRank leadership recognizing exemplary technical drive and contribution.",
    icon: FileBadge,
  },
  {
    id: "06",
    label: "MISSION OPERATIONS // OC",
    name: "ThinkForBharat 1.0 — Organizing Committee",
    issuer: "Code Capital & Coffee",
    year: "2024",
    color: "#f59e0b",
    context: "Core organizing committee driving nationwide hackathon logistics, community building, and engineering operations.",
    icon: Users,
  },
];

function CertCard({ cert, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const IconComponent = cert.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card"
      style={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(13, 17, 23, 0.75)",
        backdropFilter: "blur(14px)",
        borderRadius: 14,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cert.color}45`;
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 12px 30px -10px ${cert.color}25`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Top accent glow line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
          opacity: 0.7,
        }}
      />

      <div>
        {/* Header row: Portfolio Label + Number */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 10 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 10,
              fontWeight: 700,
              color: cert.color,
              background: `${cert.color}14`,
              border: `1px solid ${cert.color}35`,
              padding: "4px 10px",
              borderRadius: 4,
              letterSpacing: "0.1em",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {IconComponent && <IconComponent size={12} />}
            {cert.label}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              color: "rgba(148, 163, 184, 0.4)",
              letterSpacing: "0.1em",
              fontWeight: 600,
            }}
          >
            {cert.id}
          </span>
        </div>

        {/* Title */}
        <h4
          style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: "#f1f5f9",
            margin: "0 0 10px",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
          }}
        >
          {cert.name}
        </h4>

        {/* Organization / Issuer & Year */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 11,
              color: "#94a3b8",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: cert.color }} />
            {cert.issuer}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: 10,
              color: "rgba(148, 163, 184, 0.6)",
              background: "rgba(255,255,255,0.04)",
              padding: "2px 8px",
              borderRadius: 3,
            }}
          >
            {cert.year}
          </span>
        </div>

        {/* Project pill if present */}
        {cert.project && (
          <div
            style={{
              marginBottom: 12,
              padding: "6px 10px",
              borderRadius: 6,
              background: "rgba(0, 255, 136, 0.06)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#00ff88", fontWeight: 600 }}>
              Project: {cert.project}
            </span>
          </div>
        )}

        {/* Impact Context */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12.5,
            lineHeight: 1.6,
            color: "rgba(148, 163, 184, 0.75)",
            margin: 0,
          }}
        >
          {cert.context}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function CommandCenter({ onOpenTerminal }) {
  return (
    <div style={{ width: "100%", position: "relative", zIndex: 10 }}>
      {/* Hero */}
      <CommandDeckHero onOpenTerminal={onOpenTerminal} />

      <div className="hr-glow" />

      {/* ── Missions ─────────────────────────────────── */}
      <section id="featured-missions" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader eyebrow="ENGINEERING PORTFOLIO" title="Selected Missions" action={{ href: "/missions", label: "All missions" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,340px),1fr))", gap: 20 }}>
          {missions.map((m, i) => <MissionCard key={m.id} mission={m} index={i} />)}
        </div>
      </section>

      <div className="hr-glow" />

      {/* ── My Big 6 ──────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <SectionHeader eyebrow="VERIFIED ACHIEVEMENTS" title="My Big 6" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,350px),1fr))", gap: 18 }}>
          {BIG_SIX.map((c, i) => <CertCard key={c.id} cert={c} index={i} />)}
        </div>
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <a href="https://www.linkedin.com/in/ramanujpatro/details/certifications/" target="_blank" rel="noreferrer"
            style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(0,212,255,0.6)", border: "1px solid rgba(0,212,255,0.18)", padding: "8px 14px", borderRadius: 6, textDecoration: "none", transition: "all 0.2s", letterSpacing: "0.08em", display: "inline-flex", alignItems: "center", gap: 6 }}
            onMouseEnter={e => { e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(0,212,255,0.6)"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.18)"; }}
          >
            View all on LinkedIn <ExternalLink size={11} />
          </a>
        </div>
      </section>

      <div className="hr-glow" />

      {/* ── CTA ──────────────────────────────────────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px" }}>
        <div className="glass-card" style={{ padding: "64px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(0,212,255,0.03),transparent,rgba(139,92,246,0.04))", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,212,255,0.4),transparent)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.18em", color: "rgba(0,212,255,0.6)", textTransform: "uppercase", margin: "0 0 16px" }}>OPEN FOR OPPORTUNITIES</p>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Let's build something<br />
              <span style={{ background: "linear-gradient(90deg,rgba(0,212,255,0.4),#00d4ff 30%,#fff 50%,#00d4ff 70%,rgba(0,212,255,0.4))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "shimmer 5s linear infinite" }}>extraordinary together</span>
            </h2>
            <p style={{ color: "rgba(148,163,184,0.65)", maxWidth: 480, margin: "0 auto 32px", fontSize: 14, lineHeight: 1.7 }}>
              Whether it's engineering, research collaboration, or just a good conversation about systems and AI — my channel is open.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Link to="/contact" onClick={() => soundFx.playClick?.()} className="btn-primary"><span>Open a Channel</span><ArrowRight size={16} /></Link>
              <a href="/resume.pdf" download="Ramanuj_Resume.pdf" className="btn-ghost"><BookOpen size={16} style={{ color: "#00d4ff" }} /><span>Download Resume</span></a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer { from{background-position:-400% 0} to{background-position:400% 0} }
        .glass-card:hover .card-glow-line { width:100% !important; }
      `}</style>
    </div>
  );
}
