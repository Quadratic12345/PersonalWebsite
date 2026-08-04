import { useState } from "react";
import { Topbar } from "./components/Topbar";
import { CommandNav } from "./components/CommandNav";
import { SectionView } from "./components/SectionView";
import { sections } from "./data/sections";
import type { SectionData, SectionId } from "./types";

const HERO_IMAGE = "hero.jpg";

export default function App() {
  const [activeId, setActiveId] = useState<SectionId | null>(null);

  const activeSection: SectionData | undefined = sections.find(
    (s) => s.id === activeId
  );

  function goTo(section: SectionData) {
    setActiveId(section.id);
  }

  function goHome() {
    setActiveId(null);
  }

  return (
    <div className="app">
      <Topbar
        sections={sections}
        activeId={activeId}
        onSelect={(id) => setActiveId(id)}
        onLogoClick={goHome}
      />

      {activeSection ? (
        <SectionView section={activeSection} onBack={goHome} />
      ) : (
        <CommandNav sections={sections} onNavigate={goTo} heroImage={HERO_IMAGE} />
      )}
    </div>
  );
}