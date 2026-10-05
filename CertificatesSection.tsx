import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { Certificate } from '../types/portfolio';
import { Award, Eye, X, CheckCircle, ShieldCheck, Printer } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="py-24 bg-[#090d16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Qualifications</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Official Accreditations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Credentials
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Professional credentials validating specialized competencies in state IT frameworks, enterprise accounting, Python logic, and Java OOP.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 self-start md:self-auto bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>4 Certified Credentials</span>
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#0c1220]/90 border border-slate-800/90 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between group"
            >
              <div>
                {/* Header with category and credential status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-cyan-400">
                    {cert.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Certificate Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-xs text-slate-400 mb-4 font-medium">
                  Issued by: <span className="text-slate-200">{cert.issuer}</span>
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                  {cert.description}
                </p>

                {/* Skills Covered Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900/90 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Direct Photo View Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">
                  ID: {cert.credentialId}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-800/60 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate Photo</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Interactive Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c1220] border border-cyan-500/50 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto">
            
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                  Accredited Credential Document
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
                  title="Print / Save Certificate"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Print</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* High-Fidelity Rendered Certificate Photo / Graphic Document */}
            <div className="relative rounded-xl p-8 bg-gradient-to-br from-[#0f172a] via-[#090d16] to-[#0f172a] border-2 border-amber-500/40 shadow-inner text-center overflow-hidden mb-6">
              {/* Certificate Border Accents */}
              <div className="absolute inset-2 border border-amber-500/20 rounded-lg pointer-events-none" />
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

              {/* Watermark Emblem */}
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Award className="w-8 h-8" />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-amber-400 uppercase">
                Certificate of Proficiency & Completion
              </span>

              <h4 className="text-xl sm:text-2xl font-bold text-white mt-2 mb-1">
                {selectedCert.title}
              </h4>

              <p className="text-xs text-slate-400 mb-5">
                This document certifies that
              </p>

              <div className="inline-block px-6 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 mb-4">
                <span className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-200">
                  KULDEEP SINGH
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed mb-6">
                has successfully completed all rigorous assessment criteria, practical assignments, and examination standards in <strong>{selectedCert.category}</strong>.
              </p>

              {/* Signatures & Credentials Row */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Issuing Authority</span>
                  <span className="font-semibold text-slate-200">{selectedCert.issuer}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-500 uppercase font-mono">Verification Hash</span>
                  <span className="font-mono text-cyan-400 font-semibold">{selectedCert.credentialId}</span>
                </div>
              </div>
            </div>

            {/* Description and Skills summary */}
            <div className="space-y-3">
              <p className="text-xs text-slate-300">
                <strong>Curriculum Overview:</strong> {selectedCert.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCert.skillsCovered.map((s) => (
                  <span key={s} className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
