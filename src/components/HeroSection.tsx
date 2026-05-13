import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative px-6 pt-24 pb-16 text-center min-h-[90dvh] flex flex-col justify-center items-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-script text-2xl text-primary glow-text"
      >
        once upon a tonight
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-6xl leading-[1.05] gradient-text mt-3"
      >
        happy<br />birthday
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
        className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-primary to-transparent"
        style={{ transformOrigin: "center" }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mt-6 text-sm text-muted-foreground max-w-[18rem] leading-relaxed"
      >
        I built you a tiny universe. Scroll gently — every section was made
        thinking of you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
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
