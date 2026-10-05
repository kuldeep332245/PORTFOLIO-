export interface Project {
  id: string;
  title: string;
  category: 'Web Application' | 'Educational' | 'Data & Tools';
  description: string;
  highlights: string[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: string; // e.g., "Advanced", "Proficient", "Intermediate"
    details: string;
  }[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  category: string;
  date: string;
  description: string;
  skillsCovered: string[];
  credentialId?: string;
  badgeColor: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  status: 'Running' | 'Completed';
  details: string;
}
