export type SectionId = "about" | "skills" | "projects" | "blogs" | "contact";

export interface ProjectEntry {
  name: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface BlogEntry {
  title: string;
  excerpt: string;
  date: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface SectionData {
  id: SectionId;
  label: string;
  path: string;
  aliases: string[];
  accent: string;
  image: string;
  heading: string;
  intro: string;
  paragraphs?: string[];
  skills?: SkillGroup[];
  projects?: ProjectEntry[];
  blogs?: BlogEntry[];
  contactLinks?: ContactLink[];
}