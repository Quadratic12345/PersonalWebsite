import { useState, type FormEvent } from "react";
import type { SectionData } from "../types";
import { findSectionByQuery } from "../data/sections";

interface CommandNavProps {
  sections: SectionData[];
  onNavigate: (section: SectionData) => void;
  heroImage: string;
}

export function CommandNav({ sections, onNavigate, heroImage }: CommandNavProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function resolve(query: string) {
    const match = findSectionByQuery(query);
    if (match) {
      setError("");
      onNavigate(match);
    } else {
      setError(`no section matches "${query}" — try skills, projects, blogs, or contact`);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    resolve(value);
  }

  return (
    <section className="hero">
      <div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero__scrim" />

      <div className="hero__content">
        <p className="hero__eyebrow">SK full-stack developer</p>

        <form className="command-line" onSubmit={handleSubmit}>
          <span className="command-line__prompt">&gt;</span>
          <input
            className="command-line__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="where do you want to go?"
            aria-label="Type a section to visit"
            autoComplete="off"
          />
          <span className="command-line__cursor" aria-hidden="true" />
        </form>

        <p className="hero__hint">pick one below</p>

        <div className="suggestion-row">
          {sections.map((section) => (
            <button
              key={section.id}
              className="nav-chip"
              style={{ ["--chip-accent" as string]: section.accent }}
              onClick={() => onNavigate(section)}
            >
              {section.label}
            </button>
          ))}
        </div>

        <p className="hero__error" role="status">
          {error}
        </p>
      </div>
    </section>
  );
}