import React, { useState } from 'react';
import { X, Download, Printer, Mail, Phone, MapPin, Linkedin, Copy, Check, FileText } from 'lucide-react';
import { PERSONAL_INFO, CERTIFICATIONS, EDUCATION_DATA, PROJECTS } from '../data/portfolioData';
import { downloadResumePdf } from '../utils/generateResumePdf';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    setDownloading(true);
    try {
      downloadResumePdf();
    } catch (err) {
      console.error('PDF generation error:', err);
      // Fallback to print
      window.print();
    } finally {
      setTimeout(() => setDownloading(false), 1200);
    }
  };

  const handleCopyText = () => {
    const text = `KULDEEP SINGH
BCA STUDENT • ASPIRING DATA ANALYST & SOFTWARE DEVELOPER
Phone: ${PERSONAL_INFO.phone} | Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}
LinkedIn: ${PERSONAL_INFO.linkedinUrl} | GitHub: ${PERSONAL_INFO.githubUrl}

PROFESSIONAL SUMMARY
Motivated Bachelor of Computer Applications (BCA) student with foundational knowledge of Python, Java, C, C++, SQL, MS Excel and Data Analytics. Interested in transforming data into useful insights and developing practical technology solutions.

CORE SKILLS
- Programming: C, C++, Java, Python, JavaScript
- Data & Analytics: SQL, MS Excel, Data Analytics Fundamentals, Data Interpretation
- Computer / Tools: Tally ERP, Web Technologies (HTML, CSS, React), Git & GitHub
- Problem Solving: Logical Thinking, Analytical Thinking, Debugging, Quick Learning
- Professional: Communication, Teamwork, Adaptability, Time Management, Self Motivation

EDUCATION
- Bachelor of Computer Applications (BCA) (2025–2028 Running), Adarsh College of Professional Studies
- 12th (RBSE) (2022) — 72.00%, Govt. S.S.S. Achpura
- 10th (RBSE) (2020) — 55.83%, Govt. S.S.S. Achpura

PROJECTS
- C-Guru: Interactive C Programming Hub (HTML5, CSS3, JavaScript, C)
- Car Garage: Auto Workshop & Service Hub (Responsive Web App)
- OIBSIP: Web Development Internship Showcase
- AI Resume Builder: Dynamic Curriculum Vitae Platform

CERTIFICATIONS
- RS-CIT — Rajasthan State Certificate in Information Technology (VMOU & RKCL)
- Tally ERP — Financial & Business Accounting
- Python Programming
- OOPs in Java

Declaration: I hereby declare that the information provided above is true to the best of my knowledge and belief.
Kuldeep Singh`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Control Bar (Non-printable) */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900 text-white border-b border-slate-800 shrink-0 print:hidden gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Kuldeep Singh — Curriculum Vitae</span>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Direct Real PDF Download Button */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 active:scale-95"
              title="Download Kuldeep_Singh_Resume.pdf file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>

            {/* Print Fallback */}
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Copy All Text */}
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              title="Copy resume text to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="overflow-y-auto p-6 sm:p-10 font-sans print:p-0 print:overflow-visible bg-white">
          
          {/* Header */}
          <div className="text-center pb-5 border-b-2 border-slate-900 mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
              KULDEEP SINGH
            </h1>
            <p className="text-sm font-semibold tracking-widest text-slate-700 italic uppercase mb-3">
              BCA STUDENT • ASPIRING DATA ANALYST & SOFTWARE DEVELOPER
            </p>

            {/* Contact Strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-700">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-900" /> {PERSONAL_INFO.phone}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-900" /> {PERSONAL_INFO.email}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-900" /> {PERSONAL_INFO.location}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-900" /> linkedin.com/in/kuldeep-singh-6874a1352
              </span>
            </div>
          </div>

          {/* Section: Professional Summary */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
              Motivated Bachelor of Computer Applications (BCA) student with foundational knowledge of <strong>Python, Java, C, C++, SQL, MS Excel and Data Analytics</strong>. Interested in transforming data into useful insights and developing practical technology solutions. Familiar with programming fundamentals, OOP concepts, databases, problem solving and basic web technologies. Currently building practical skills through academic learning, personal projects and continuous practice, with the goal of growing in the IT and Data Analytics field.
            </p>
          </div>

          {/* Section: Core Skills */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Core Skills
            </h2>
            <div className="grid grid-cols-1 gap-1.5 text-xs text-slate-800">
              <div className="flex flex-col sm:flex-row">
                <span className="w-36 font-bold shrink-0">Programming:</span>
                <span>C • C++ • Java • Python • JavaScript / TypeScript</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="w-36 font-bold shrink-0">Data & Analytics:</span>
                <span>SQL • MS Excel • Data Analytics Fundamentals • Data Interpretation</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="w-36 font-bold shrink-0">Computer / Tools:</span>
                <span>Tally ERP • Web Technologies (HTML, CSS, React) • Git & GitHub</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="w-36 font-bold shrink-0">Problem Solving:</span>
                <span>Logical Thinking • Analytical Thinking • Debugging • Quick Learning</span>
              </div>
              <div className="flex flex-col sm:flex-row">
                <span className="w-36 font-bold shrink-0">Professional:</span>
                <span>Communication • Teamwork • Adaptability • Time Management • Self Motivation</span>
              </div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-3 text-xs text-slate-800">
              {EDUCATION_DATA.map((edu) => (
                <div key={edu.degree} className="flex justify-between items-start">
                  <div>
                    <strong className="text-slate-900 block font-bold text-xs">{edu.degree}</strong>
                    <span className="text-slate-700">{edu.institution}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-semibold block">{edu.period}</span>
                    <span className="text-slate-700 font-medium">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Academic & Personal Projects */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Academic & Personal Projects
            </h2>
            <div className="space-y-3.5 text-xs text-slate-800">
              {PROJECTS.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <strong className="font-bold text-slate-900">{proj.title}</strong>
                    <span className="text-[11px] text-slate-500 font-mono">{proj.techStack.slice(0, 3).join(', ')}</span>
                  </div>
                  <p className="text-[12px] text-slate-700 mb-1 leading-snug">
                    {proj.description}
                  </p>
                  <ul className="list-disc list-inside text-[11px] text-slate-700 space-y-0.5 ml-1">
                    {proj.highlights.slice(0, 2).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Certifications */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Certifications
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-800 space-y-1">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id}>
                  <strong>{cert.title}</strong> — {cert.issuer}
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Relevant Coursework */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Relevant Coursework
            </h2>
            <p className="text-xs text-slate-800 leading-relaxed">
              Object-Oriented Programming • Data Structures • Database / SQL Fundamentals • Computer Fundamentals • Web Technology Basics • Data Analytics Fundamentals
            </p>
          </div>

          {/* Languages & Interests */}
          <div className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Languages & Interests
            </h2>
            <div className="text-xs text-slate-800 space-y-1">
              <div><strong>Languages:</strong> Hindi (Fluent) • English (Basic / Working)</div>
              <div><strong>Interests:</strong> Data Analytics • Programming • Technology • Learning New Skills</div>
            </div>
          </div>

          {/* Career Objective & Declaration */}
          <div className="pt-2 border-t border-slate-300 text-xs text-slate-800">
            <p className="mb-2 italic">
              <strong>Declaration:</strong> I hereby declare that the information provided above is true to the best of my knowledge and belief.
            </p>
            <p className="font-bold text-slate-900 text-right mt-3">
              Kuldeep Singh
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
