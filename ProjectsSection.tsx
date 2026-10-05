import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Github, ArrowUpRight, CheckCircle2, FolderGit2, Code2 } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web Application', 'Educational'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 bg-[#090d16] relative border-t border-slate-800/80">
      {/* Background subtle mesh glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>GitHub Repositories</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>Open Source Codebases</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects & GitHub Repos
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
              Direct access to the source code, architecture, and implementations on GitHub. Click on any project to explore the code repository.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#0f172a] rounded-xl border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {cat === 'All' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-2xl bg-[#0c1220]/90 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-950/30 flex flex-col overflow-hidden"
            >
              {/* Media Preview Box with Direct Click to GitHub */}
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${project.title} on GitHub`}
                className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-slate-800 block cursor-pointer"
              >
                <img
                  src={project.imageUrl}
                  alt={`${project.title} project code repository`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1220] via-transparent to-transparent opacity-75" />

                {/* Category Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium">
                  <span className="px-2.5 py-1 rounded-md bg-slate-950/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 font-mono text-[11px]">
                    {project.category}
                  </span>
                </div>

                {/* GitHub Code Hover Badge */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/90 group-hover:bg-cyan-500 text-slate-200 group-hover:text-black font-semibold text-xs backdrop-blur-md transition-colors border border-slate-700/80 shadow-lg">
                  <Github className="w-3.5 h-3.5" />
                  <span>Inspect Code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                
                {/* Title with link */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-start justify-between gap-2"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 shrink-0 mt-1 transition-colors" />
                  </a>
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6 space-y-2">
                  {project.highlights.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 mb-7 mt-auto">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Primary Action Button: Direct GitHub Repository */}
                <div className="pt-4 border-t border-slate-800/80">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 hover:from-cyan-950 hover:to-slate-900 border border-slate-700 hover:border-cyan-500/60 shadow-md transition-all hover:translate-y-[-1px] group/btn"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>View GitHub Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-cyan-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* GitHub Organization Profile Strip */}
        <div className="mt-14 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0 border border-slate-700">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Full GitHub Profile: @kuldeep223345</p>
              <p className="text-xs text-slate-400">Explore all source repositories, algorithmic problem sets, and web development codebases.</p>
            </div>
          </div>
          <a
            href="https://github.com/kuldeep223345"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors whitespace-nowrap flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
          >
            <Github className="w-4 h-4" />
            <span>Open GitHub Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
