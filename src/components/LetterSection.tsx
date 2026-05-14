import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
const paragraphs = [
  "If I had to count the things I love about you, I would run out of stars long before I ran out of reasons. you are the soft place the world keeps sending me back to.",
  "thank you for the laughter that doesn't know how to be quiet. for the calls that turn into mornings. for being the kind of person who makes ordinary days feel like something worth remembering.",
  "on your birthday, I want you to know — you are deeply, ridiculously, quietly loved. not just today. every day. in every version of you, in every chapter still to come.",
];

export default function LetterSection({
  onOpen,
}: {
  onOpen: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
  const audio = new Audio("/public/songs/letter.mp3");

  audio.preload = "auto";

  audio.volume = 0.4;

  audioRef.current = audio;
}, []);
  const [typed, setTyped] = useState("");
  const closing = "always yours, — me ✦";
useEffect(() => {
  if (open) {
    audioRef.current?.play();
  } else {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
}, [open]);
 
  useEffect(() => {
    if (!open) { setTyped(""); return; }
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setTyped(closing.slice(0, i));
      if (i >= closing.length) clearInterval(iv);
    }, 80);
    return () => clearInterval(iv);
  }, [open]);

  return (
    <section className="relative px-6 py-28" id="letter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <p className="font-script text-xl text-primary glow-text rotate-[-2deg] inline-block">a letter, just for you</p>
        <h2 className="font-display italic text-4xl gradient-text mt-2">
          {open ? "read me slowly" : "open me, gently"}
        </h2>
      </motion.div>

      <div className="relative mx-auto" style={{ minHeight: open ? 540 : 280 }}>
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="sealed"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -4, rotate: 0 }}
              onClick={() => setOpen(true)}
              className="relative mx-auto block paper rounded-sm w-full max-w-[20rem] aspect-[1.4/1] -rotate-2"
              style={{ boxShadow: "var(--shadow-polaroid)" }}
              aria-label="open letter"
            >
              {/* fold lines */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-black/10" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-black/5" />
              {/* address */}
              <div className="absolute top-6 left-6 right-6 font-script text-neutral-700">
                <p className="text-sm opacity-70">to —</p>
                <p className="text-2xl">my dearest you</p>
              </div>
              {/* wax seal */}
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-5 right-5 w-16 h-16 rounded-full grid place-items-center font-script text-2xl text-white/95"
                style={{
                  background: "radial-gradient(circle at 35% 30%, oklch(0.7 0.18 25), oklch(0.4 0.18 20) 80%)",
                  boxShadow: "0 6px 20px -6px oklch(0.4 0.2 20 / 0.7), inset -3px -4px 8px oklch(0.2 0.1 20 / 0.6)",
                }}
              >
                ♡
              </motion.div>
              <p className="absolute -bottom-8 left-0 right-0 text-center font-script text-base text-primary glow-text">
                tap to open ✦
              </p>
            </motion.button>
          ) : (
            <motion.article
              key="opened"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top center" }}
              className="paper rounded-sm p-7 leading-relaxed text-[15px] space-y-5 relative"
            >
              <p className="font-script text-3xl text-rose-700/80">my dearest,</p>
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.4 }}
                  className="font-display italic text-neutral-800"
                >
                  {p}
                </motion.p>
              ))}
              <p className="font-script text-2xl text-rose-700/80 text-right pt-4">
                {typed}
                <span className="inline-block w-[2px] h-5 bg-rose-700/70 ml-0.5 align-middle animate-pulse" />
              </p>
              {/* glowing music indicator */}
              <div className="absolute -top-4 -right-4 glass rounded-full px-3 py-2 flex items-center gap-2">
                <span className="block w-2 h-2 rounded-full bg-primary glow-pink animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/80">our song · playing</span>
              </div>
              <span className="absolute -top-3 left-6 w-16 h-4 tape rotate-[-3deg]" />
              <span className="absolute -bottom-3 right-8 w-16 h-4 tape rotate-[2deg]" />
            </motion.article>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-20 text-center"
      >
        <p className="font-script text-3xl gradient-text glow-text">happy birthday</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          another trip around the sun
        </p>
      </motion.div>
    </section>
  );
}
