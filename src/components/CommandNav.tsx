import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import type { SectionData } from "../types";
import { findSectionByQuery } from "../data/sections";
import { quotes } from "../data/quotes";

interface CommandNavProps {
  sections: SectionData[];
  onNavigate: (section: SectionData) => void;
  heroImage: string;
}

function formatClock(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const hours24 = date.getHours();
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 || 12;
  return `${pad(hours12)}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${period}`;
}

export function CommandNav({ sections, onNavigate, heroImage }: CommandNavProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [now, setNow] = useState(() => new Date());
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const clockLabel = formatClock(now);

  useEffect(() => {
    inputRef.current?.focus();
  }, [error]);

  const normalized = value.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalized) return [];
    return sections.filter((section) =>
      section.aliases.some((alias) => alias.startsWith(normalized))
    );
  }, [sections, normalized]);

  const chipRow = normalized && suggestions.length > 0 ? suggestions : sections;
  const topMatch = suggestions[highlightedIndex] ?? suggestions[0];

  useEffect(() => {
    setHighlightedIndex(0);
  }, [normalized]);

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
    if (suggestions.length > 0) {
      setError("");
      onNavigate(suggestions[highlightedIndex] ?? suggestions[0]);
      return;
    }
    if (!value.trim()) return;
    resolve(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + suggestions.length) % suggestions.length);
    }
  }

  return (
    <section className="hero">
      <div className="hero__image" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero__scrim" />

      <p className="hero__clock" aria-label={`Current time ${clockLabel}`}>
        {clockLabel}
      </p>

      <div className="hero__content">
        <p className="hero__eyebrow">SK full-stack developer</p>

        <div className="command-wrap">
          <form className="command-line" onSubmit={handleSubmit}>
            <span className="command-line__prompt">&gt;</span>
            <input
              ref={inputRef}
              className="command-line__input"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="where do you want to go?"
              aria-label="Type a section to visit"
              role="combobox"
              aria-expanded={suggestions.length > 0}
              aria-controls="command-suggestions"
              aria-autocomplete="list"
              autoComplete="off"
              autoFocus
            />
            <span className="command-line__cursor" aria-hidden="true" />
          </form>

          {suggestions.length > 0 && (
            <ul className="command-suggestions" id="command-suggestions" role="listbox">
              {suggestions.map((section, i) => (
                <li key={section.id} role="option" aria-selected={i === highlightedIndex}>
                  <button
                    type="button"
                    className={`command-suggestions__item${
                      i === highlightedIndex ? " command-suggestions__item--active" : ""
                    }`}
                    style={{ ["--chip-accent" as string]: section.accent }}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => onNavigate(section)}
                  >
                    <span className="command-suggestions__label">{section.label}</span>
                    <span className="command-suggestions__heading">{section.heading}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <p className="hero__hint">
          {topMatch ? `press enter to open ${topMatch.label}` : "pick one below"}
        </p>

        <div className="suggestion-row">
          {chipRow.map((section) => (
            <button
              key={section.id}
              className={`nav-chip${section.id === topMatch?.id ? " nav-chip--active" : ""}`}
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

        <p className="hero__quote">&ldquo;{quote}&rdquo;</p>
      </div>
    </section>
  );
}