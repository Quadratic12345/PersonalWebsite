import type { SectionData } from "../types";

export const sections: SectionData[] = [
   {
    id: "about",
    label: "about",
    path: "~/about",
    aliases: ["About","ABOUT","about", "who", "bio", "me"],
    accent: "#F2D53C",
    image: "/bg5.jpg",
    heading: "Who's building this",
    intro: "Hello I am Sankalp, trying to build things independently and shipping as I learn.",
    paragraphs: [
      "Started from an HTML/CSS/JS base and built up toward full-stack work one project at a time.",
      "Currently focused on learning modern development patterns while shipping real, working software.",
      "Interested in Tech and Football.",
      "Feel free to contact me."
    ],
  },
  {
    id: "skills",
    label: "skills",
    path: "~/skills",
    aliases: ["Skills","SKILLS","skills", "skill", "stack", "tech"],
    accent: "#5EC8D8",
    image: "/bg1.jpg",
    heading: "What I build with",
    intro:
      "Somethings which I am trying to learn",
    skills: [
      {
        label: "Frontend",
        items: ["React", "TypeScript", "Vite", "Clerk"],
      },
      {
        label: "Backend",
        items: ["Node", "Express", "FastAPI", "REST APIs", "RabbitMQ"],
      },
      {
        label: "Data",
        items: ["MongoDB", "PostgreSQL", "SQLAlchemy", "Redis"],
      },
      {
        label: "Tools",
        items: ["Git", "Github", "Firebase","Docker"],
      },
    ],
  },
  {
    id: "projects",
    label: "projects",
    path: "~/projects",
    aliases: ["Projects","PROJECTS","projects", "project", "work", "portfolio"],
    accent: "#E8720C",
    image: "/bg2.jpg",
    heading: "Things I have shipped",
    intro: "Some projects that I have built",
    projects: [
      {
        name: "Social",
        description:
          "A Social media backend using System design concepts like Redis and RabbitMQ.",
        stack: ["React", "Vite", "Express", "MongoDB"],
        github: "https://github.com/Quadratic12345/Social",
      },
      {
        name: "URL Shortener",
        description: "A link-shortening service built on FastAPI with a PostgreSQL store.",
        stack: ["FastAPI", "SQLAlchemy", "PostgreSQL"],
        github: "https://github.com/Quadratic12345/URL_Shortener",
      },
      {
        name: "World Cup 2026 Predictions",
        description: "A live knockout-bracket prediction app for the 2026 World Cup.",
        stack: ["React","Firebase"],
        github: "https://github.com/Quadratic12345/r_cup",
        live: "https://r-cup.vercel.app",
      },
      {
        name: "Saksham",
        description: "A document parsing website with the implementation of RAG",
        stack: ["Typescript","FastAPI", "Clerk"],
        github: "https://github.com/Quadratic12345/Saksham",
        live: "https://sakshamnotes.vercel.app",
      },
    ],
  },
  {
    id: "blogs",
    label: "blogs",
    path: "~/blogs",
    aliases: ["Blogs","BLOGS","blogs", "blog", "writing", "notes"],
    accent: "#C9A6E8",
    image: "/bg3.jpg",
    heading: "Blogs here",
    intro: "Blogs on some topics here",
    blogs: [
       {
        title: "The Craziness of Redis PubSub",
        excerpt:
          "Redis Pubsub is one of the best when it comes to distribute the data in a very low latency time. It is such because it works in the concept of pushing the data instead of pulling it, so what happens is that the broker distributes the data available in its cache immediately. Notification systems are very good examples of this, like if there are 10 users then if we send a notification using Redis PubSub they get the notification immediately without any delay, but if a new user joins after the data is shared then they do not receive the data as the PubSub does not store any data it distibutes them immediately and clears the cache. ",
        date: "2026",
      },
    ],
  },
  {
    id: "contact",
    label: "contact",
    path: "~/contact",
    aliases: ["Contact","CONTACT","contact", "email", "reach", "hire", "connect"],
    accent: "#7FD858",
    image: "/bg4.jpg",
    heading: "Get in touch",
    intro: "Open to interesting builds, collaborations, and the occasional argument about schemas.",
    contactLinks: [
      { label: "Email", value: "sankalpkar80@gmail.com", href: "mailto:sankalpkar80@gmail.com" },
      { label: "GitHub", value: "github.com/Quadratic12345", href: "https://github.com/Quadratic12345" },
      { label: "LinkedIn", value: "linkedin.com/in/Sankalp Kar", href: "https://www.linkedin.com/in/sankalp-kar-5b4961336?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
      { label: "X", value: "x.com/Sankalpsomethin", href: "https://x.com/Sankalpsomethin" },
    ],
  },
];

export function findSectionByQuery(query: string): SectionData | undefined {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return undefined;
  return sections.find((section) =>
    section.aliases.some(
      (alias) => normalized === alias || normalized.includes(alias)
    )
  );
}