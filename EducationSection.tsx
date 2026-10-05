import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, Award, CheckCircle, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-[#07090e] relative border-t border-slate-800/80 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Educational Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Academic progression from foundational schooling to higher computer applications degree.
          </p>
        </div>

        {/* Responsive Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-14">
          {EDUCATION_DATA.map((item, idx) => {
            const isLatest = idx === 0;
            return (
              <div
                key={item.degree}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                  isLatest
                    ? 'bg-[#0e1628]/95 border-2 border-cyan-500/50 shadow-xl shadow-cyan-950/30'
                    : 'bg-[#0c1220]/90 border border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {isLatest && (
                  <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-cyan-500 text-[#07090e] text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Current Degree
                  </div>
                )}

                <div>
                  {/* Timeline Period & Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 ${
                        item.status === 'Running'
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                          : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60'
                      }`}
                    >
                      {item.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                    {item.degree}
                  </h3>

                  {/* Institution */}
                  <p className="text-xs sm:text-sm font-medium text-slate-300 mb-4">
                    {item.institution}
                  </p>

                  {/* Score / Performance Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-5">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Score: {item.score}</span>
                  </div>

                  {/* Curriculum Details */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.details}
                  </p>
                </div>

                {/* Footer Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-cyan-400" />
                    <span>Academic Verified</span>
                  </span>
                  <span>{item.period}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Career Objective & Academic Mission Quote Box */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0c1220] to-slate-900/90 border border-cyan-500/30 text-center shadow-lg">
          <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            Career Objective
          </p>
          <blockquote className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
            "To obtain an entry-level opportunity or internship where I can apply my programming and data-analysis knowledge, gain practical industry experience, learn from professionals, and contribute to meaningful technical work."
          </blockquote>
          <span className="block mt-4 text-xs font-semibold text-slate-400 font-mono">
            — Kuldeep Singh · BCA Scholar
          </span>
        </div>

      </div>
    </section>
  );
};

