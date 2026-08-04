/* ═══════════════════════════════════════════════════════════
   Type Definitions — PRD §7 Data Models
   ═══════════════════════════════════════════════════════════ */

/** §7.4 Experience */
export interface Experience {
  company: string;
  companyFullName: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string[];
}

/** §7.5 Projects */
export interface Project {
  slug: string;
  title: string;
  summary: string;
  overview?: string;
  thumbnail: string;
  problem: string;
  solution: string;
  role: string;
  result: string;
  gallery?: string[];
  githubUrl: string;
  websiteUrl?: string;
  /**
   * The tech stack used in the project.
   * IMPORTANT: The names must EXACTLY MATCH the 'name' property
   * of the skills in data/skills.ts (case-sensitive) to correctly
   * group and render the icons in the project detail page.
   */
  techStack: string[];
}

/** §7.6 Skills */
export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

/** §7.7 Activities */
export interface Activity {
  title: string;
  role: string;
  description: string[];
  gallery?: string[];
  logo?: string;
}

/** Navigation link */
export interface NavLink {
  label: string;
  href: string;
}
