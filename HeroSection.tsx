import React, { useState } from 'react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Download, Github, Linkedin, Mail, MapPin, Sparkles, Check, Copy } from 'lucide-react';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResumeModal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: -(y * 18), y: x * 18 });
  };

  const handleMouseLeave = () => {
    setCardTilt({ x: 0, y: 0 });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="about" className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Spatial Background */}
      <Hero3DCanvas />

      {/* Subtle radial glow overlay */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Identity & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Quiet unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
              <span className="font-bold text-cyan-300">Aspiring Data Analyst</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>BCA Scholar</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Software & Analytics</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 text-balance">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Data & Code</span> into Useful Real-World Solutions.
            </h1>

            {/* Narrative Prose */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-6 max-w-2xl">
              Hello! I'm <strong className="text-white font-semibold">Kuldeep Singh</strong> from Sirohi, Rajasthan. I specialize in 
              bridging computational programming with <strong className="text-cyan-300 font-medium">Python, Java, C/C++</strong>, and 
              practical <strong className="text-cyan-300 font-medium">SQL & Data Analytics</strong>, crafting responsive, high-performance web interfaces and structured analytical tools.
            </p>

            {/* Location & Contact Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-8 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-1.5 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300 transition-colors"
                title="Click to copy email address"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PERSONAL_INFO.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#07090e] bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-all hover:border-slate-600 hover:translate-y-[-1px]"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume & Download PDF</span>
              </button>

              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors"
              >
                <Github className="w-4 h-4 text-slate-200" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Quantitative Claim Proof Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {PERSONAL_INFO.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-white font-mono tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: 3D Perspective Tilt Card */}
          <div className="lg:col-span-5 flex justify-center perspective-1000">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className="relative w-full max-w-md preserve-3d cursor-pointer group"
            >
              {/* Outer 3D Glow Backing */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/30 via-sky-500/20 to-indigo-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500" />

              {/* Main 3D Card Surface */}
              <div className="relative rounded-2xl bg-[#0c1220]/90 backdrop-blur-xl border border-cyan-500/30 p-6 shadow-2xl overflow-hidden">
                
                {/* Status Header Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold text-emerald-400 tracking-wide">
                      Available for Internships
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    BCA 2025–2028
                  </span>
                </div>

                {/* Developer Profile Image Container */}
                <div className="relative rounded-xl overflow-hidden mb-5 aspect-square border border-slate-700/60 bg-slate-900 group">
                  <img
                    src={PERSONAL_INFO.avatarImage}
                    alt="Kuldeep Singh - Aspiring Data Analyst & Software Developer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback container in case image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Badges on Card */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                    <div>
                      <span className="font-bold text-sm text-white drop-shadow block leading-tight">Kuldeep Singh</span>
                      <span className="text-[11px] text-cyan-300 font-mono">Aspiring Data Analyst</span>
                    </div>
                    <span className="font-mono text-slate-300 text-[11px] px-2 py-0.5 rounded bg-slate-950/85 border border-cyan-500/30">
                      BCA Scholar
                    </span>
                  </div>
                </div>

                {/* Tech Capabilities Ribbon */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">Core Tech Arsenal</span>
                    <span className="text-cyan-400 flex items-center gap-1 font-mono text-[11px]">
                      <Sparkles className="w-3 h-3" /> 3D Spatial Interactive
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {['Python', 'SQL & Excel', 'Java OOP', 'C / C++', 'React & Vite', 'Tally ERP'].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 border border-slate-700/80 font-mono text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Quick Profile Summary Footer */}
                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <span>GitHub: <strong className="text-white font-mono">{PERSONAL_INFO.githubUser}</strong></span>
                    <a
                      href={PERSONAL_INFO.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 font-semibold"
                    >
                      Visit Repos →
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
