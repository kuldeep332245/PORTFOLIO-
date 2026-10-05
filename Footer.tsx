import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05070a] border-t border-slate-900 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand & Editorial Signature */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="font-bold text-white text-sm">
              Kuldeep Singh
            </span>
            <span className="hidden sm:inline text-slate-700" aria-hidden="true">·</span>
            <span>BCA Student & Aspiring Data Analyst</span>
            <span className="hidden sm:inline text-slate-700" aria-hidden="true">·</span>
            <span>Sirohi, Rajasthan</span>
          </div>

          {/* Clean Navigation & Profile Links */}
          <div className="flex items-center gap-5">
            <a
              href="#about"
              className="hover:text-cyan-400 transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="hover:text-cyan-400 transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="hover:text-cyan-400 transition-colors"
            >
              Skills
            </a>
            <a
              href="#certifications"
              className="hover:text-cyan-400 transition-colors"
            >
              Certificates
            </a>
            <a
              href="#contact"
              className="hover:text-cyan-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500 hover:text-black text-slate-300 transition-colors ml-2"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile-Friendly Code Download Box for Easy GitHub Upload */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="text-xs font-semibold text-white block">Download Full Project Code (ZIP)</span>
            <span className="text-[11px] text-slate-400">Download the complete source code directly to your phone to easily upload on GitHub.</span>
          </div>
          <a
            href="/api/download-project-zip"
            download="kuldeep-portfolio-source.zip"
            className="px-4 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-500/20 whitespace-nowrap"
          >
            <span>📦 Download Code (ZIP)</span>
          </a>
        </div>

        {/* Quiet Copyright Row */}
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>
            © {new Date().getFullYear()} Kuldeep Singh. Built with React, TypeScript & 3D WebGL.
          </span>
          <span className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" /> for high performance
          </span>
        </div>
      </div>
    </footer>
  );
};
