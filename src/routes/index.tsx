import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StarField } from "@/components/StarField";
import { useAmbient } from "@/components/Ambient";
import PasswordGate from "@/components/PasswordGate";
import HeroSection from "@/components/HeroSection";
import MemoriesSection from "@/components/MemoriesSection";
import SongsSection from "@/components/SongsSection";
import LetterSection from "@/components/LetterSection";
import { HeroWhimsy, FloatingDoodles, SecretEnding } from "@/components/SpaceWhimsy";

export const Route = createFileRoute("/")({
  component: Index,
});

const SPECIAL_DATE = "020426";
const HINT = undefined;

function Index() {
  const [unlocked, setUnlocked] = useState(false);
  const ambient = useAmbient();

  // when letter opens, shift ambient to a warmer chord and ensure it's playing
  const handleLetterOpen = useCallback((open: boolean) => {
    ambient.setIntimate(open);
    if (open && !ambient.playing) ambient.start();
  }, [ambient]);

  // gentle: stop on unmount
  useEffect(() => () => ambient.stop(), [ambient]);

  return (
    <main className="mobile-frame text-foreground grain vignette">
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
            <div className="relative">
              <HeroSection
                ambientPlaying={ambient.playing}
                onToggleAmbient={ambient.toggle}
              />
              <HeroWhimsy />
            </div>
            <div className="relative">
              <MemoriesSection />
              <FloatingDoodles />
            </div>
            <SongsSection />
            <LetterSection onOpen={handleLetterOpen} />
            <footer className="px-6 pt-4 text-center">
              <p className="font-script text-base text-muted-foreground/80 italic">
                with all my heart, forever ✦
              </p>
            </footer>
            <SecretEnding />
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
