import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Memory = {
  caption: string;
  src: string;
  hue: string;
  top: number;
  left: number;
  width: number;
  rotate: number;
  hidden?: string;
};

const memories: Memory[] = [
  { caption: "you laughed too hard here", src: "/photo/Photo1.webp", hue: "from-pink-300/40 to-purple-400/30", top: 2, left: 8, width: 170, rotate: -7, hidden: "prittiest of tem all!!!" },
  { caption: "2am.", src: "/photo/Photo2.webp", hue: "from-violet-300/40 to-indigo-400/30", top: 18, left: 52, width: 140, rotate: 6, hidden: "zhopat jaa lavkar nibbu" },
  { caption: "our favourite evening", src: "/photo/Photo3.webp", hue: "from-amber-200/40 to-pink-300/30", top: 38, left: 12, width: 180, rotate: 4, hidden: "gods plan;lovely gola" },
  { caption: "my karlyacha ladu <3", src: "/photo/Photo4.webp", hue: "from-fuchsia-300/40 to-purple-400/30", top: 56, left: 48, width: 160, rotate: -5, hidden: "cutest nickname ever" },
  { caption: "you looked happiest here", src: "/photo/Photo5.webp", hue: "from-rose-300/40 to-pink-400/30", top: 78, left: 10, width: 175, rotate: 3, hidden: "always be this happy , god bless you" },
];

const doodles = [
  { top: 8, left: 70, char: "✦", size: 22, rotate: 0, color: "var(--glow-pink)" },
  { top: 28, left: 4, char: "↘", size: 28, rotate: -10, color: "white" },
  { top: 50, left: 84, char: "♡", size: 20, rotate: 12, color: "var(--glow-pink)" },
  { top: 66, left: 78, char: "✿", size: 24, rotate: -6, color: "var(--glow-violet)" },
  { top: 82, left: 4, char: "✧", size: 18, rotate: 0, color: "white" },
];

const stickyNotes = [
  { top: 6, left: 70, text: "promise me\nanother year of this", rotate: 5 },
  { top: 40, left: 78, text: "you. always.", rotate: -8 },
  { top: 78, left: 70, text: "this one\nstays.", rotate: 7 },
];

export default function MemoriesSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-24" id="memories">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-2"
      >
        <p className="font-script text-xl text-primary glow-text rotate-[-2deg] inline-block">a little scrapbook</p>
        <h2 className="font-display italic text-4xl gradient-text mt-2">our moments</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto italic">
          tap a memory — it remembers things too.
        </p>
      </motion.div>

      {/* scattered wall */}
      <div className="relative w-full" style={{ height: "1000px" }}>
        {/* sticky paper notes */}
        {stickyNotes.map((n, i) => (
          <motion.div
            key={`note-${i}`}
            initial={{ opacity: 0, y: 20, rotate: n.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: n.rotate }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, delay: 0.1 * i }}
            className="absolute paper px-3 py-2 font-script text-[15px] leading-tight whitespace-pre-line shadow-md"
            style={{
              top: `${n.top}%`,
              left: `${n.left}%`,
              width: 110,
              transform: `rotate(${n.rotate}deg)`,
            }}
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 tape rotate-[-3deg]" />
            {n.text}
          </motion.div>
        ))}

        {/* doodles */}
        {doodles.map((d, i) => (
          <motion.span
            key={`doo-${i}`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1, delay: 0.05 * i }}
            className="absolute font-script select-none"
            style={{
              top: `${d.top}%`,
              left: `${d.left}%`,
              fontSize: d.size,
              color: d.color,
              transform: `rotate(${d.rotate}deg)`,
              textShadow: "0 0 12px currentColor",
            }}
          >
            {d.char}
          </motion.span>
        ))}

        {/* polaroids */}
        {memories.map((m, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 60, rotate: m.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(i)}
            className="absolute bg-white/95 p-2 pb-10 rounded-[2px] text-left"
            style={{
              top: `${m.top}%`,
              left: `${m.left}%`,
              width: m.width,
              transform: `rotate(${m.rotate}deg)`,
              boxShadow: "var(--shadow-polaroid)",
            }}
          >
            <div
              className={`aspect-[4/5] bg-gradient-to-br ${m.hue} relative overflow-hidden rounded-[1px]`}
            >
              <img
                src={m.src}
                alt={m.caption}
                loading="lazy"
                decoding="async"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)] pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_85%,rgba(0,0,0,0.25),transparent_55%)] pointer-events-none" />
              <span className="absolute bottom-2 left-2 font-script text-xl text-white/70 select-none drop-shadow">
                #{i + 1}
              </span>
            </div>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 tape rotate-[-2deg]" />
            <figcaption className="absolute bottom-1.5 left-0 right-0 text-center font-script text-[15px] text-neutral-700 px-1">
              {m.caption}
            </figcaption>
          </motion.button>
        ))}
      </div>

      {/* enlarged memory modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="mem-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[90] grid place-items-center bg-black/70 backdrop-blur-sm px-6"
          >
            <motion.figure
              initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative bg-white p-3 rounded-sm w-[80vw] max-w-sm"
              style={{ boxShadow: "var(--shadow-polaroid)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`aspect-[4/5] rounded-sm bg-gradient-to-br ${memories[open].hue} relative overflow-hidden`}
              >
                <img
                  src={memories[open].src}
                  alt={memories[open].caption}
                  decoding="async"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.25),transparent_55%)] pointer-events-none" />
              </div>
              <figcaption className="mt-4 mb-2 text-center font-script text-xl text-neutral-700 px-2 break-words">
                {memories[open].caption}
              </figcaption>
              {memories[open].hidden && (
                <p className="mt-3 -mx-1 text-center font-script text-[17px] text-primary glow-text px-2 break-words">
                  ✦ {memories[open].hidden}
                </p>
              )}
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
