import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { soundFx } from "../utils/sound";

export default function DeveloperNotePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Only show popup ONCE ever (persisted in localStorage)
    const hasSeen = localStorage.getItem("ramanuj_note_seen");
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    soundFx.playClick?.();
    setIsOpen(false);
    localStorage.setItem("ramanuj_note_seen", "true");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 w-[calc(100vw-2.5rem)] sm:w-[390px] rounded-2xl bg-[#0c1017]/95 border border-white/[0.12] p-5 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl"
          style={{
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 30px -10px rgba(0, 212, 255, 0.15)",
          }}
        >
          {/* Top Cyan Glow Accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Header: Label + Close X */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded-sm uppercase inline-flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3" />
              A note from me
            </span>
            <button
              type="button"
              onClick={handleClose}
              className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close note popup"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2 tracking-tight">
            Hey, I'm Ramanuj.
          </h3>

          {/* Minimized Content */}
          <div className="text-slate-300 font-sans text-xs sm:text-sm leading-relaxed space-y-2">
            <p>
              If you've made it this far, welcome to my little corner of the internet.
            </p>
            <p>
              I like building things, breaking them, figuring out why they broke, and then rebuilding them better.
            </p>

            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.25 }}
                className="space-y-2 pt-2 border-t border-white/[0.06]"
              >
                <p>
                  I enjoy going down random technical rabbit holes, starting projects that sometimes become something useful, and learning things simply because I want to know how they work.
                </p>
                <p>
                  I'm still figuring out exactly where I want to go in computer science. For now, I'm exploring, building, researching, and trying to get a little better at this every day.
                </p>
                <p>
                  So feel free to look around. Read something. Open a project. Check out the things I've built. Maybe you'll find something interesting.
                </p>
                <p>
                  And if you do, I'd genuinely like to hear from you.
                </p>
                <p className="font-['Newsreader',serif] italic text-base text-cyan-400 font-semibold pt-1">
                  — Ramanuj
                </p>
              </motion.div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick?.();
                setExpanded(!expanded);
              }}
              className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer font-bold"
            >
              {expanded ? (
                <>
                  <span>Minimize</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </>
              ) : (
                <>
                  <span>Read more</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <Link
                to="/contact"
                onClick={handleClose}
                className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
              >
                <span>Full note</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <button
                type="button"
                onClick={handleClose}
                className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors cursor-pointer"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
