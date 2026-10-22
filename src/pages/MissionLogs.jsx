import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { missionLogs } from "../data/logs";
import { soundFx } from "../utils/sound";
import {
  Search,
  ArrowRight,
  Coffee,
  Bookmark,
  Calendar,
  Heart,
  Pin
} from "lucide-react";

// Washi tape color accents for cards
const TAPE_STYLES = [
  { bg: "bg-[#d8c2a7]", text: "text-[#3b2a1a]", label: "ENTRY // 01" },
  { bg: "bg-[#c9d4c5]", text: "text-[#1e301b]", label: "ENTRY // 02" },
  { bg: "bg-[#d8c5d1]", text: "text-[#351e2e]", label: "ENTRY // 03" },
  { bg: "bg-[#cbd2dc]", text: "text-[#1e2735]", label: "ENTRY // 04" },
];

export default function MissionLogs() {
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const allTags = ["ALL", "AI", "BACKEND", "REDIS", "FASTAPI", "SYSTEMS"];

  const filteredLogs = useMemo(() => {
    return missionLogs.filter((log) => {
      const matchesTag = selectedTag === "ALL" || log.tags.includes(selectedTag);
      const matchesSearch =
        !searchQuery.trim() ||
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTag && matchesSearch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      {/* ── Top Header inspired by Digital Notebook + Stickers ── */}
      <header className="mb-12">
        {/* Top Washi Tape Header Tag */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="inline-flex items-center space-x-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dfcaad] text-[#332213] font-['Caveat',cursive] font-bold text-base -rotate-1 rounded-sm shadow-sm select-none"
              style={{
                clipPath: "polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)",
              }}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Digital Notebook &amp; Journal</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              Ramanuj // Volume 2026
            </span>
          </div>

          {/* Cute Sticker Pill */}
          <div className="flex items-center space-x-2 text-xs font-mono bg-[#0c0d12] border border-white/10 px-3 py-1 rounded-full text-slate-300">
            <Coffee className="w-3.5 h-3.5 text-amber-400" />
            <span>4 Field Logs Recorded</span>
          </div>
        </div>

        {/* Title: Serif Italic + Bold Tracking */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.08]">
          <div>
            <span className="block font-['Newsreader',serif] italic text-2xl sm:text-3xl text-amber-200/90 mb-1">
              Dark Mode
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-wider uppercase">
              NOTEBOOK + PAPERS
            </h1>
            <p className="text-sm sm:text-base font-sans text-slate-300 mt-2 max-w-xl leading-relaxed">
              Engineering thoughts, distributed algorithms, and deep-dives. Documented in personal pages like an interactive digital planner.
            </p>
          </div>

          {/* Sticky Affirmation Memo Card (from reference image) */}
          <div
            className="relative bg-[#d8c2a7] text-[#2c1f14] p-4 rounded-xl shadow-lg w-full md:w-72 shrink-0 rotate-1 transform hover:rotate-0 transition-transform"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 0% 99%)",
            }}
          >
            {/* Top Washi Tape strip holding the sticky note */}
            <div
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#ffffff]/60 backdrop-blur-xs rounded-xs shadow-xs -rotate-2 pointer-events-none"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 96%, 0% 100%)" }}
            />
            {/* Pushpin icon */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#5a4230] mb-1 font-bold">
              <span className="flex items-center gap-1"><Pin className="w-3 h-3" /> Note</span>
              <span>2026</span>
            </div>
            <p className="font-['Caveat',cursive] text-lg font-bold leading-tight text-[#2c1f14]">
              "Write clear abstractions. Build systems you would be proud to maintain years from now."
            </p>
            <div className="mt-2 pt-1 border-t border-[#2c1f14]/15 flex items-center justify-between text-[10px] font-mono text-[#5a4230]">
              <span>— Ramanuj</span>
              <Heart className="w-3 h-3 fill-rose-600/60 text-rose-700" />
            </div>
          </div>
        </div>

        {/* ── Search & Filter Pill Buttons (Like Planner Weekdays) ── */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedTag(tag);
                }}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full shrink-0 transition-all ${selectedTag === tag
                    ? "bg-white text-black font-bold shadow-md shadow-white/20"
                    : "bg-[#0b0c10] text-slate-300 border border-white/[0.08] hover:text-white hover:border-white/20"
                  }`}
              >
                {tag === "ALL" ? "All Notes" : `#${tag.toLowerCase()}`}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notebook..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-[#0b0c10] border border-white/[0.09] rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/60 transition-all"
            />
          </div>
        </div>
      </header>

      {/* ── Planner Note Pages Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {filteredLogs.map((log, index) => {
          const tape = TAPE_STYLES[index % TAPE_STYLES.length];

          return (
            <Link
              key={log.id}
              to={`/logs/${log.slug}`}
              onClick={() => soundFx.playClick()}
              className="group relative block rounded-2xl bg-[#090a0d] border border-white/[0.08] hover:border-amber-400/35 p-6 sm:p-7 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/80 transition-all duration-300 flex flex-col justify-between"
              style={{
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Cute Washi Tape Strip at top of card */}
              <div
                className={`absolute -top-3 left-8 px-4 py-0.5 ${tape.bg} ${tape.text} font-['Caveat',cursive] font-bold text-xs -rotate-2 rounded-xs shadow-md select-none group-hover:rotate-0 transition-transform`}
                style={{ clipPath: "polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)" }}
              >
                {tape.label}
              </div>

              <div>
                {/* Meta pills row (Planner day badge style from image) */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 pt-1">
                  <div className="flex items-center space-x-2">
                    {/* White weekday pill badge like image */}
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-black font-bold text-[11px] shadow-xs">
                      {log.date}
                    </span>
                    <span className="flex items-center space-x-1 text-slate-300 text-[11px]">
                      <Coffee className="w-3.5 h-3.5 text-amber-400" />
                      <span>{log.readTime}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-200 transition-colors leading-snug">
                  {log.title}
                </h2>

                {/* Subtitle in elegant serif italic */}
                <p className="font-['Newsreader',serif] italic text-amber-100/80 text-sm sm:text-base mt-2 leading-relaxed">
                  {log.subtitle}
                </p>

                {/* Abstract */}
                <p className="text-xs font-sans text-slate-400/90 mt-3 line-clamp-3 leading-relaxed">
                  {log.abstract}
                </p>
              </div>

              {/* Bottom Card Row: Sticker Tags & Open Note button */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06]"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-1 text-xs font-mono font-bold text-amber-300 group-hover:text-amber-200 group-hover:translate-x-1 transition-all">
                  <span>Open Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-16 bg-[#161821] rounded-2xl border border-dashed border-white/10 p-8">
          <Bookmark className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No pages found in notebook</h3>
          <p className="text-xs font-mono text-slate-400">
            Try adjusting your search query or tag filter.
          </p>
          <button
            onClick={() => {
              setSelectedTag("ALL");
              setSearchQuery("");
            }}
            className="mt-4 px-3.5 py-1.5 text-xs font-mono bg-white text-black font-bold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
