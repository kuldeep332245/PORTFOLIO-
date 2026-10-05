import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, ArrowUpRight, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certificates', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with Career Field */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white hover:text-cyan-400 transition-colors group"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse inline-block shrink-0" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap">
              Kuldeep Singh
            </span>
            <span className="text-[11px] sm:text-xs font-mono font-medium text-cyan-400 sm:border-l sm:border-slate-700 sm:pl-2 whitespace-nowrap">
              Aspiring Data Analyst
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* External Social Profiles */}
          <a
            href={PERSONAL_INFO.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-slate-700 bg-slate-900/60 text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Resume Modal Button */}
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>

          {/* Primary Action Button */}
          <a
            href="#contact"
            className="flex items-center gap-1 px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-[#07090e] bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-800 px-4 py-5 shadow-2xl transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResumeModal();
                }}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-800/50 rounded-lg"
              >
                <FileText className="w-4 h-4" />
                <span>View Full Resume</span>
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={PERSONAL_INFO.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-lg"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white bg-slate-800/60 rounded-lg"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/api/download-project-zip"
                download="kuldeep-portfolio-source.zip"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm"
              >
                <span>📦 Download Code ZIP (For GitHub)</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
