import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { missionLogs } from "../data/logs";
import { soundFx } from "../utils/sound";
import {
  ArrowLeft,
  Coffee,
  Share2,
  Check,
  Copy,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Heart
} from "lucide-react";

function CodeBlock({ children, className }) {
  const [copied, setCopied] = useState(false);
  const text = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    soundFx.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-5 rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0e14]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#141720] border-b border-white/[0.06] text-xs font-mono text-slate-400">
        <span className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{className?.replace("language-", "") || "code"}</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-1 hover:text-white transition-colors text-[11px]"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
        <code>{children}</code>
      </div>
    </div>
  );
}

export default function MissionLogArticle() {
  const { slug } = useParams();
  const logIndex = missionLogs.findIndex((l) => l.slug === slug);
  const [copiedLink, setCopiedLink] = useState(false);

  if (logIndex === -1) {
    return <Navigate to="/logs" replace />;
  }

  const log = missionLogs[logIndex];
  const prevLog = logIndex > 0 ? missionLogs[logIndex - 1] : null;
  const nextLog = logIndex < missionLogs.length - 1 ? missionLogs[logIndex + 1] : null;

  const handleCopyLink = async () => {
    soundFx.playClick();
    const url = window.location.href;
    let successful = false;

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(url);
        successful = true;
      } catch {
        successful = false;
      }
    }

    if (!successful) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        successful = document.execCommand("copy");
        textArea.remove();
      } catch {
        successful = false;
      }
    }

    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
      {/* ── Top Bar ───────────────────────────────────────────── */}
      <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08] relative z-20">
        <Link
          to="/logs"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center space-x-2 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors py-1 px-2.5 rounded-full hover:bg-white/[0.05] border border-transparent hover:border-white/10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to notebook</span>
        </Link>

        <button
          type="button"
          onClick={handleCopyLink}
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] cursor-pointer"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Link copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Share note</span>
            </>
          )}
        </button>
      </div>

      {/* ── The Open Dark Notebook Page Canvas ────────────────── */}
      <div
        className="relative rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-2xl p-6 sm:p-10 mb-8"
        style={{
          boxShadow:
            "0 20px 50px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Top Washi Tape Strip holding this page */}
        <div
          className="absolute -top-3.5 left-10 px-5 py-0.5 bg-[#dfcaad] text-[#332213] font-['Caveat',cursive] font-bold text-sm -rotate-1 rounded-xs shadow-md select-none"
          style={{ clipPath: "polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)" }}
        >
          NOTEBOOK ENTRY // {log.logNumber}
        </div>

        {/* Header Metadata */}
        <header className="mb-8 pt-2">
          {/* Weekday pill & coffee reading time like image */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono mb-4">
            <span className="px-2.5 py-0.5 rounded-full bg-white text-black font-bold text-[11px] shadow-xs">
              {log.date}
            </span>
            <span className="flex items-center space-x-1 text-slate-300 text-[11px]">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>{log.readTime}</span>
            </span>
            <span className="text-white/20">•</span>
            <span className="text-amber-300 font-bold">Ramanuj</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight mb-3">
            {log.title}
          </h1>

          {/* Subtitle in serif italic */}
          <p className="font-['Newsreader',serif] italic text-amber-100/90 text-base sm:text-lg leading-relaxed mb-6">
            {log.subtitle}
          </p>

          {/* ── Cute Sticky Memo Card for Abstract (like reference image) ── */}
          <div
            className="relative bg-[#d8c2a7] text-[#2c1f14] p-5 rounded-xl shadow-lg my-6 rotate-0.5"
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 98%, 98% 100%, 0% 99%)",
            }}
          >
            {/* Washi tape on top of the sticky note */}
            <div
              className="absolute -top-2 left-8 w-16 h-4 bg-white/60 rounded-xs shadow-xs -rotate-2 pointer-events-none"
              style={{ clipPath: "polygon(3% 0%, 97% 2%, 100% 96%, 0% 100%)" }}
            />
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider uppercase text-[#5a4230] font-bold mb-1.5">
              <span className="flex items-center space-x-1">
                <BookOpen className="w-3 h-3 text-[#5a4230]" />
                <span>SUMMARY &amp; SCOPE</span>
              </span>
              <span>MEMO</span>
            </div>
            <p className="font-['Caveat',cursive] text-lg sm:text-xl font-bold leading-snug text-[#2c1f14]">
              {log.abstract}
            </p>
          </div>
        </header>

        {/* ── Markdown Content ────────────────────────────────── */}
        <div className="text-slate-200 leading-relaxed space-y-6 text-sm sm:text-base font-sans font-normal">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ ...props }) => (
                <h2
                  className="text-xl sm:text-2xl font-bold font-display text-white pt-6 pb-2 border-b border-white/[0.08]"
                  {...props}
                />
              ),
              h3: ({ ...props }) => (
                <h3
                  className="text-lg sm:text-xl font-bold font-display text-amber-300 pt-4 pb-1"
                  {...props}
                />
              ),
              p: ({ ...props }) => (
                <p className="text-slate-200 leading-relaxed" {...props} />
              ),
              ul: ({ ...props }) => (
                <ul className="list-disc pl-6 space-y-2 text-slate-300" {...props} />
              ),
              ol: ({ ...props }) => (
                <ol className="list-decimal pl-6 space-y-2 text-slate-300 font-mono" {...props} />
              ),
              blockquote: ({ ...props }) => (
                <blockquote
                  className="border-l-4 border-amber-400 pl-4 py-2 italic font-['Newsreader',serif] text-amber-200/90 bg-amber-500/[0.05] rounded-r my-5 text-base sm:text-lg"
                  {...props}
                />
              ),
              code: ({ inline, className, children, ...props }) => {
                if (inline) {
                  return (
                    <code
                      className="px-1.5 py-0.5 rounded bg-white/[0.08] text-amber-300 font-mono text-xs border border-white/[0.06]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return <CodeBlock className={className}>{children}</CodeBlock>;
              },
            }}
          >
            {log.content}
          </ReactMarkdown>
        </div>

        {/* ── Cute Sign-off Sticker at bottom ─────────────────── */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
            <span>Documented in Ramanuj's Field Journal</span>
          </div>
          <div className="flex items-center space-x-1.5 font-['Caveat',cursive] text-lg font-bold text-amber-300">
            <span>Written with curiosity</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/80" />
          </div>
        </div>
      </div>

      {/* ── Next / Previous Page Navigation ───────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevLog ? (
          <Link
            to={`/logs/${prevLog.slug}`}
            onClick={() => soundFx.playClick()}
            className="p-4 rounded-xl bg-[#161821] border border-white/[0.08] hover:border-amber-400/40 text-left transition-all group shadow-md"
          >
            <div className="flex items-center space-x-1.5 text-[10px] font-mono text-slate-400 mb-1">
              <ChevronLeft className="w-3 h-3 text-amber-400" />
              <span>PREVIOUS NOTE</span>
            </div>
            <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
              {prevLog.title}
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLog && (
          <Link
            to={`/logs/${nextLog.slug}`}
            onClick={() => soundFx.playClick()}
            className="p-4 rounded-xl bg-[#161821] border border-white/[0.08] hover:border-amber-400/40 text-right transition-all group shadow-md"
          >
            <div className="flex items-center justify-end space-x-1.5 text-[10px] font-mono text-slate-400 mb-1">
              <span>NEXT NOTE</span>
              <ChevronRight className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors line-clamp-1">
              {nextLog.title}
            </div>
          </Link>
        )}
      </div>
    </article>
  );
}
