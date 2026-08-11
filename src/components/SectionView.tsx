import type { SectionData } from "../types";

interface SectionViewProps {
  section: SectionData;
  onBack: () => void;
}

export function SectionView({ section, onBack }: SectionViewProps) {
  return (
    <section
  className={`section-view ${section.contactLinks ? "section-view--contact" : ""}`}
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
              <a className="contact-link" href={link.href} key={link.label}>
                <span className="contact-link__label">{link.label}</span>
                <span>{link.value}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}