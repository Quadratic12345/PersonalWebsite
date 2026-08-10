import { useEffect, useState } from "react";
import { Topbar } from "./components/Topbar";
import { CommandNav } from "./components/CommandNav";
import { SectionView } from "./components/SectionView";
import { NotFound } from "./components/NotFound";
import { sections } from "./data/sections";
import type { SectionData, SectionId } from "./types";

const HERO_IMAGE = "/hero.jpg";

sections.forEach((section) => {
  if (section.image) {
    const img = new Image();
    img.src = section.image;
  }
});

function isSectionId(value: string): value is SectionId {
  return sections.some((s) => s.id === value);
}

function readPath(): string {
  return window.location.pathname.replace(/^\/+/, "").replace(/\/+$/, "");
}

export default function App() {
  const [activeId, setActiveId] = useState<SectionId | null>(() => {
    const path = readPath();
    return path && isSectionId(path) ? (path as SectionId) : null;
  });
  const [notFoundPath, setNotFoundPath] = useState<string | null>(() => {
    const path = readPath();
    return path && !isSectionId(path) ? path : null;
  });

  const activeSection: SectionData | undefined = sections.find(
    (s) => s.id === activeId
  );

  function navigateToId(id: SectionId | null) {
    setNotFoundPath(null);
    setActiveId(id);

    const newPath = id ? `/${id}` : "/";
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath + window.location.search);
    }
  }

  function goTo(section: SectionData) {
    navigateToId(section.id);
  }

  function goHome() {
    navigateToId(null);
  }

  function stepSection(direction: 1 | -1) {
    if (!activeId) return;
    const currentIndex = sections.findIndex((s) => s.id === activeId);
    const nextIndex = (currentIndex + direction + sections.length) % sections.length;
    navigateToId(sections[nextIndex].id);
  }
  useEffect(() => {
    function handlePopState() {
      const path = readPath();
      if (!path) {
        setActiveId(null);
        setNotFoundPath(null);
      } else if (isSectionId(path)) {
        setActiveId(path as SectionId);
        setNotFoundPath(null);
      } else {
        setActiveId(null);
        setNotFoundPath(path);
      }
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  useEffect(() => {
    if (!activeId && !notFoundPath) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        goHome();
        (document.activeElement as HTMLElement | null)?.blur();
        return;
      }

      if (!activeId) return;

      if (e.key === "ArrowRight") {
        stepSection(1);
      } else if (e.key === "ArrowLeft") {
        stepSection(-1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, notFoundPath]);

  return (
    <div className="app">
      <Topbar
        sections={sections}
        activeId={activeId}
        onSelect={(id) => navigateToId(id)}
        onLogoClick={goHome}
      />

      {notFoundPath !== null ? (
        <NotFound path={notFoundPath} onHome={goHome} />
      ) : activeSection ? (
        <SectionView section={activeSection} onBack={goHome} />
      ) : (
        <CommandNav sections={sections} onNavigate={goTo} heroImage={HERO_IMAGE} />
      )}
    </div>
  );
}