import type { SectionData } from "../types";

interface SectionViewProps {
  section: SectionData;
  onBack: () => void;
}

function ContactIcon({ label }: { label: string }) {
  switch (label.toLowerCase()) {
    case "email":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="contact-link__icon"
        >
          <path
            d="M3 5.5h18v13H3v-13Zm0 .5 9 7 9-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "github":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="contact-link__icon"
        >
          <path
            fill="currentColor"
            d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.66 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17a10.9 10.9 0 0 1 5.73 0c2.19-1.48 3.15-1.17 3.15-1.17.62 1.57.23 2.73.11 3.02.73.8 1.18 1.82 1.18 3.07 0 4.4-2.69 5.36-5.25 5.65.41.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
          />
        </svg>
      );

    case "linkedin":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="contact-link__icon"
        >
          <path
            fill="currentColor"
            d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96 2.48 2.48 0 0 0 0-4.96ZM2.75 9.5h4.46V21H2.75V9.5Zm7.27 0h4.28v1.57h.06c.6-1.13 2.05-2.32 4.22-2.32 4.51 0 5.34 2.97 5.34 6.84V21h-4.45v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55V21h-4.45V9.5Z"
          />
        </svg>
      );

    case "x":
      return (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="contact-link__icon"
        >
          <path
            fill="currentColor"
            d="M18.24 2h3.68l-8.04 9.19L23.34 22h-7.45l-5.84-7.63L3.38 22H-.3l8.61-9.84L-.76 2h7.64l5.28 6.95L18.24 2Zm-1.29 17.67h2.04L5.56 4.22H3.37l13.58 15.45Z"
          />
        </svg>
      );

    default:
      return null;
  }
}

export function SectionView({ section, onBack }: SectionViewProps) {
  return (
    <section
      className={`section-view ${
        section.contactLinks
          ? "section-view--contact"
          : section.paragraphs
          ? "section-view--about"
          : ""
      }`}
      style={{ ["--section-accent" as string]: section.accent }}
    >
      <div
        className="section-view__image"
        style={{ backgroundImage: `url(${section.image})` }}
      />

      <div className="section-view__body">
        <button className="back-link" onClick={onBack}>
          &larr; back <span className="back-link__key"></span>
        </button>

        <p className="section-view__path">{section.path}</p>

        <h1 className="section-view__heading">{section.heading}</h1>

        <p className="section-view__intro">{section.intro}</p>

        {section.paragraphs && (
          <div className="prose-block">
            {section.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {section.skills && (
          <div className="skill-grid">
            {section.skills.map((group) => (
              <div key={group.label}>
                <p className="skill-group__label">{group.label}</p>

                <ul className="skill-group__items">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {section.projects && (
          <div className="entry-list">
            {section.projects.map((project) => (
              <article className="entry-card" key={project.name}>
                <h2 className="entry-card__title">{project.name}</h2>

                <p className="entry-card__desc">
                  {project.description}
                </p>

                <div className="stack-row">
                  {project.stack.map((tech) => (
                    <span className="stack-pill" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub ↗
                    </a>
                  )}

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {section.blogs && (
          <div className="entry-list">
            {section.blogs.map((post) => (
              <article className="entry-card" key={post.title}>
                <h2 className="entry-card__title">{post.title}</h2>

                <p className="blog-excerpt">{post.excerpt}</p>

                <span className="entry-date">{post.date}</span>
              </article>
            ))}
          </div>
        )}

        {section.contactLinks && (
          <div className="contact-list">
            {section.contactLinks.map((link) => (
              <a
                className="contact-link"
                href={link.href}
                key={link.label}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={
                  link.label !== "Email"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                <ContactIcon label={link.label} />

                <span className="contact-link__label">
                  {link.label}
                </span>

                <span className="contact-link__value">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}