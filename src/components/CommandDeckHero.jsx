import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { soundFx } from "../utils/sound";
import { crewProfile } from "../data/profile";
import { ArrowRight, Mail, Terminal, ArrowDown } from "lucide-react";

/* ── starfield canvas ─────────────────────────────────────── */
function StarField() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = c.width = c.offsetWidth;
    let H = c.height = c.offsetHeight;
    let id;
    const rnd = (a, b) => a + Math.random() * (b - a);
    const stars = Array.from({ length: 220 }, () => ({
      x: rnd(0, W), y: rnd(0, H),
      r: rnd(0.3, 1.8), alpha: rnd(0.08, 0.75),
      speed: rnd(0.002, 0.012), phase: rnd(0, Math.PI * 2),
    }));
    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      for (const s of stars) {
        const a = s.alpha * (0.4 + 0.6 * Math.sin(s.phase + t * s.speed));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,230,255,${a})`; ctx.fill();
      }
      id = requestAnimationFrame(draw);
    }
    id = requestAnimationFrame(draw);
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
}

/* ── mouse-reactive blob ──────────────────────────────────── */
function ParallaxBlob({ color, size, x: bx, y: by, strength = 0.04 }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      mx.set(cx * strength); my.set(cy * strength);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my, strength]);

  return (
    <motion.div
      style={{
        position: "absolute", left: bx, top: by,
        width: size, height: size,
        background: `radial-gradient(ellipse, ${color} 0%, transparent 70%)`,
        borderRadius: "50%", pointerEvents: "none",
        x: sx, y: sy, filter: "blur(60px)",
      }}
    />
  );
}

/* ── typewriter ───────────────────────────────────────────── */
function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[idx]; let t;
    if (!del && char < word.length) t = setTimeout(() => setChar(c => c + 1), 60);
    else if (!del && char === word.length) t = setTimeout(() => setDel(true), 2000);
    else if (del && char > 0) t = setTimeout(() => setChar(c => c - 1), 30);
    else { setDel(false); setIdx(i => (i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [idx, char, del, words]);
  return (
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, color: "rgba(0,212,255,0.9)", fontWeight: 500, letterSpacing: "0.04em" }}>
      {words[idx].slice(0, char)}
      <span style={{ animation: "blink 1s step-start infinite", color: "#00d4ff" }}>|</span>
    </span>
  );
}

/* ── scrolling quotes ticker ──────────────────────────────── */
const QUOTES = [
  "“What I cannot create, I do not understand.” — Richard Feynman",
  "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
  "“The best way to predict the future is to invent it.” — Alan Kay",
  "“Talk is cheap. Show me the code.” — Linus Torvalds",
  "“Somewhere, something incredible is waiting to be known.” — Carl Sagan",
  "“Make it work, make it right, make it fast.” — Kent Beck",
  "“Any sufficiently advanced technology is indistinguishable from magic.” — Arthur C. Clarke",
  "“First, solve the problem. Then, write the code.” — John Johnson",
];

function QuoteTicker() {
  const doubled = [...QUOTES, ...QUOTES];
  return (
    <div style={{ overflow: "hidden", width: "100%", maskImage: "linear-gradient(90deg,transparent,black 15%,black 85%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,black 15%,black 85%,transparent)" }}>
      <div className="marquee-track" style={{ display: "flex", gap: 36, width: "max-content" }}>
        {doubled.map((quote, i) => (
          <span key={i} style={{
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 12,
            fontStyle: "italic",
            color: "rgba(200,225,250,0.55)", letterSpacing: "0.03em",
            whiteSpace: "nowrap",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(0,212,255,0.4)", display: "inline-block" }} />
            {quote}
          </span>
        ))}
      </div>
    </div>
  );
}



/* ══════════════════════════════════════════════════════════ */
export default function CommandDeckHero({ onOpenTerminal }) {
  const roles = useMemo(() => ["AI / ML Engineer", "Backend Systems Builder", "Research Explorer", "Software Architect", "Open Source Builder"], []);

  const scrollDown = () => {
    document.getElementById("featured-missions")?.scrollIntoView({ behavior: "smooth" });
  };

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section style={{ position: "relative", width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <StarField />

      {/* Ambient parallax blobs */}
      <ParallaxBlob color="rgba(0,80,150,0.22)" size={800} x="-20%" y="-15%" strength={0.035} />
      <ParallaxBlob color="rgba(139,92,246,0.12)" size={600} x="60%" y="10%" strength={0.05} />
      <ParallaxBlob color="rgba(0,212,255,0.08)" size={500} x="15%" y="55%" strength={0.025} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }} className="grid-overlay" />
      {/* Scanlines */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18 }} className="scanlines" />

      {/* ── Content ── */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 920, margin: "0 auto", padding: "110px 28px 100px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>

        {/* Institution caption */}
        <motion.p {...fade(0.1)} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: "0.16em", color: "rgba(148,163,184,0.45)", margin: 0, textTransform: "uppercase" }}>
          SRM Institute of Science &amp; Technology &nbsp;·&nbsp; B.Tech CS 2025–2029
        </motion.p>

        {/* Name — the centrepiece */}
        <motion.div {...fade(0.18)}>
          <h1 style={{ margin: 0, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 0.92 }}>
            <span style={{ display: "block", fontSize: "clamp(64px,10vw,120px)", color: "#fff", WebkitTextStroke: "0px transparent" }}>
              Ramanuj
            </span>
            <span style={{
              display: "block", fontSize: "clamp(64px,10vw,120px)",
              background: "linear-gradient(90deg, rgba(0,212,255,0.4) 0%, #00d4ff 25%, #fff 50%, #00d4ff 75%, rgba(0,212,255,0.4) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 5s linear infinite",
            }}>
              Patro
            </span>
          </h1>
        </motion.div>

        {/* Typewriter role */}
        <motion.div {...fade(0.28)} style={{ height: 34, display: "flex", alignItems: "center" }}>
          <Typewriter words={roles} />
        </motion.div>

        {/* Bio */}
        <motion.p {...fade(0.36)} style={{ maxWidth: 540, fontSize: 15, color: "rgba(200,215,235,0.70)", lineHeight: 1.75, margin: 0 }}>
          Building scalable AI systems and backend infrastructure. Turning research-grade ideas
          into production-grade reality.
        </motion.p>

        {/* CTA */}
        <motion.div {...fade(0.44)} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          <button onClick={scrollDown} className="btn-primary">
            <span>View Projects</span>
            <ArrowRight size={16} />
          </button>
          <Link to="/logs" onClick={() => soundFx.playClick?.()} className="btn-ghost">
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13 }}>Blog</span>
          </Link>
          <button
            onClick={() => { soundFx.playClick?.(); onOpenTerminal?.(); }}
            className="btn-outline"
            title="Open CLI terminal (backtick `)"
          >
            <Terminal size={15} style={{ color: "#00d4ff" }} />
            <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>CLI</span>
          </button>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fade(0.5)} style={{ display: "flex", gap: 10 }}>
          {[
            { href: crewProfile.links.github, label: "GitHub", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
            { href: crewProfile.links.linkedin, label: "LinkedIn", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
            { href: `mailto:${crewProfile.links.email}`, label: "Email", icon: <Mail size={15} /> },
          ].map(({ href, label, icon }) => (
            <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noreferrer" aria-label={label}
              style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(148,163,184,0.7)", transition: "all 0.2s ease", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.5)"; e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.boxShadow = "0 0 16px rgba(0,212,255,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; e.currentTarget.style.color = "rgba(148,163,184,0.7)"; e.currentTarget.style.boxShadow = "none"; }}
            >{icon}</a>
          ))}
        </motion.div>



        {/* HUD coords */}
        <motion.div {...fade(0.62)}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "6px 16px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.015)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(100,116,139,0.6)", letterSpacing: "0.08em" }}>
            <span>LAT 12.82° N</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#334155", display: "inline-block" }} />
            <span>LON 80.04° E</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#334155", display: "inline-block" }} />
            <span>UTC +05:30</span>
          </div>
        </motion.div>

        {/* Quotes ticker */}
        <motion.div {...fade(0.68)} style={{ width: "100%", paddingTop: 8 }}>
          <QuoteTicker />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 0.8 }}
        onClick={scrollDown}
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "rgba(100,116,139,0.55)", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: "0.18em", transition: "color 0.2s" }}
        onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
        onMouseLeave={e => e.currentTarget.style.color = "rgba(100,116,139,0.55)"}
      >
        <span>SCROLL</span>
        <ArrowDown size={13} style={{ animation: "float-y 2s ease-in-out infinite" }} />
      </motion.button>

      <style>{`
        @keyframes shimmer { from{background-position:-400% 0} to{background-position:400% 0} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float-y { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes ping-slow { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.2);opacity:0} }
      `}</style>
    </section>
  );
}
