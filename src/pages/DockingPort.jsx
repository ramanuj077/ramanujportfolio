import React, { useState } from "react";
import { soundFx } from "../utils/sound";
import {
  Mail,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Copy,
  Check
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/SocialIcons";

export default function DockingPort() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ramanujpatro07@gmail.com");
    setCopiedEmail(true);
    soundFx.playClick?.();
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    soundFx.playClick?.();
    
    // Construct mailto link as reliable direct email fallback
    const mailtoUrl = `mailto:ramanujpatro07@gmail.com?subject=${encodeURIComponent(
      formState.subject || `Message from ${formState.name}`
    )}&body=${encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\n${formState.message}`
    )}`;
    
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      {/* ── Section Header ────────────────────────────────────── */}
      <header className="mb-12 pb-8 border-b border-white/[0.08]">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3.5 py-1 rounded-full mb-3">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>CONTACT // REACH OUT</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300">Open for Collaborations</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-slate-300 font-sans mt-2 max-w-2xl leading-relaxed">
          Have an interesting engineering problem, research idea, or project collaboration in mind?
          Feel free to reach out directly.
        </p>
      </header>

      {/* ── Two-Column Layout ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Channels (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Email Card with 1-click copy */}
          <div className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-6 hover:border-cyan-400/40 transition-all shadow-xl group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Mail className="w-5 h-5" />
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Direct Email
            </span>
            <a
              href="mailto:ramanujpatro07@gmail.com"
              className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors block font-mono"
            >
              ramanujpatro07@gmail.com
            </a>
          </div>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/ramanujpatro"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick?.()}
            className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-6 hover:border-cyan-400/40 transition-all shadow-xl block group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <LinkedinIcon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
              Professional Network
            </span>
            <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors block">
              linkedin.com/in/ramanujpatro
            </span>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/ramanuj077"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick?.()}
            className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-6 hover:border-cyan-400/40 transition-all shadow-xl block group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <GithubIcon className="w-5 h-5" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block mb-1">
              GitHub Repositories
            </span>
            <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors block font-mono">
              github.com/ramanuj077
            </span>
          </a>

          {/* Location & Timezone Card */}
          <div className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-400">
                SRM Institute of Science &amp; Technology · India
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-400">
                Timezone: IST (UTC +05:30)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Modern Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#0c1017] border border-white/[0.09] p-7 sm:p-9 shadow-2xl">
            <h2 className="text-xl font-bold font-display text-white mb-2 flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-cyan-400" />
              <span>Send a Message</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mb-6">
              Fill out the details below and it will open directly in your preferred email client.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Email Prepared</h3>
                <p className="text-xs font-mono text-slate-300 max-w-md mx-auto">
                  Your message has been opened in your mail client. If it did not launch automatically, feel free to write directly to <span className="text-cyan-400 font-bold">ramanujpatro07@gmail.com</span>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-mono bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-4 py-2.5 text-xs font-mono bg-[#121622] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 text-xs font-mono bg-[#121622] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry / Collaboration / Coffee Chat"
                    className="w-full px-4 py-2.5 text-xs font-mono bg-[#121622] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your idea, research proposal, or project..."
                    className="w-full px-4 py-3 text-xs font-mono bg-[#121622] border border-white/[0.08] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 text-xs font-mono font-bold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-400/20 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message via Email</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
