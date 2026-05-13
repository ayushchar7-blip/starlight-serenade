import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StarField } from "@/components/StarField";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import MemoriesSection from "@/components/MemoriesSection";
import SongsSection from "@/components/SongsSection";
import LetterSection from "@/components/LetterSection";

export const Route = createFileRoute("/")({
  component: Index,
});

// Change this to her real birthday: MMDD (e.g. "0823" for August 23rd)
const SPECIAL_DATE = "02042026";
const HINT = "the day everything began ✦ DDMMYYYY";

function Index() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <main className="mobile-frame text-foreground">
      <StarField />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          <PasswordGate
            key="gate"
            expectedDate={SPECIAL_DATE}
            hint={HINT}
            onUnlock={() => setUnlocked(true)}
          />
        ) : (
          <div key="content" className="relative z-10 animate-in fade-in duration-1000">
            <HeroSection />
            <MemoriesSection />
            <SongsSection />
            <LetterSection />
            <footer className="px-6 pb-10 pt-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
                with love · forever
              </p>
            </footer>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
