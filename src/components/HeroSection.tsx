import { motion } from "framer-motion";
import { AmbientToggle } from "./Ambient";
import { useState } from "react";

export default function HeroSection({
  ambientPlaying,
  onToggleAmbient,
}: {
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
}) {
  const [secret, setSecret] = useState(false);
  return (
    <section className="relative px-6 pt-20 pb-16 text-center min-h-[100dvh] flex flex-col justify-center items-center">
      <div className="absolute top-6 right-6 z-20">
        <AmbientToggle playing={ambientPlaying} onToggle={onToggleAmbient} />
      </div>

      {/* clickable moon — secret message */}
      <motion.button
        onClick={() => setSecret((v) => !v)}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="absolute top-16 left-6 w-14 h-14 rounded-full"
        aria-label="moon"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, oklch(0.97 0.02 80), oklch(0.78 0.05 80) 70%, oklch(0.55 0.08 60))",
          boxShadow:
            "0 0 30px oklch(0.95 0.05 80 / 0.5), inset -6px -8px 14px oklch(0.4 0.05 60 / 0.6)",
        }}
      />
      {secret && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-32 left-6 max-w-[10rem] text-left font-script text-base text-primary glow-text"
        >
          shhh! — the moon thinks of you too.
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="font-script text-2xl text-primary glow-text rotate-[-3deg]"
      >
        wish you a happiest year ahead
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="font-display italic text-[3.6rem] sm:text-[4.2rem] leading-[0.95] gradient-text mt-3 px-2"
      >
        happy<br />
        <span className="inline-block">birthday</span>
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.4 }}
        className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ transformOrigin: "center" }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.6 }}
        className="mt-6 font-script text-2xl text-foreground/90 max-w-[18rem] leading-snug"
      >
        I built you a tiny universe.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2 }}
        className="mt-3 text-xs text-muted-foreground max-w-[16rem] leading-relaxed italic"
      >
        scroll gently — every corner was made thinkin of you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-10 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </section>
  );
}
