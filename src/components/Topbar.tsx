import type { SectionData, SectionId } from "../types";

interface TopbarProps {
  sections: SectionData[];
  activeId: SectionId | null;
  onSelect: (id: SectionId) => void;
  onLogoClick: () => void;
}

export function Topbar({ sections, activeId, onSelect, onLogoClick }: TopbarProps) {
  const active = sections.find((s) => s.id === activeId);

  return (
    <header className="topbar">
      <button className="topbar__logo" onClick={onLogoClick} aria-label="Back to home">
        SK<span>_</span>
      </button>

      <nav className="topbar__nav" aria-label="Site sections">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-chip${activeId === section.id ? " nav-chip--active" : ""}`}
            style={{ ["--chip-accent" as string]: section.accent }}
            onClick={() => onSelect(section.id)}
            aria-current={activeId === section.id ? "page" : undefined}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <span className="topbar__path">{active ? active.path : "~/home"}</span>
    </header>
  );
}