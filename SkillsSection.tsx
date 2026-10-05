import React, { useState } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code2, BarChart3, Globe, Cpu, Check, Terminal } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      default:
        return <Terminal className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 bg-[#07090e] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Academic & Practical Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Skills & Engineering Matrix
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            A balanced foundation spanning algorithmic computer programming, relational data analytics, and modern web application development.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {getIcon(cat.iconName)}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES[activeTab].skills.map((skill) => (
            <div
              key={skill.name}
              className="p-6 rounded-2xl bg-[#0c1220]/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-200 hover:bg-[#0e1628]/80 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h4>
                    <span className="text-xs font-mono text-cyan-400/90">
                      {skill.level} Level
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Verified
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-10">
                {skill.details}
              </p>
            </div>
          ))}
        </div>

        {/* Coursework & Fundamental Knowledge Strip */}
        <div className="mt-14 p-7 rounded-2xl bg-gradient-to-r from-[#0c1220] via-slate-900 to-[#0c1220] border border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Relevant Computer Applications Coursework
              </h4>
              <p className="text-xs text-slate-400">
                Object-Oriented Programming · Data Structures · Database & SQL Fundamentals · Computer Fundamentals · Web Basics · Data Analytics Fundamentals
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Adarsh College BCA Curriculum</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
