import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const songs = [
  { title: "Darkhaast", artist: "Mithoon", note: "seeing her happy is my fav view", hue: "from-pink-400/40 to-purple-500/30", src: "/songs/darkhwast.mp3" },
  { title: "Alag Aasmaan", artist: "Anuv jain", note: "ab alag aasmaan hain...", hue: "from-amber-300/40 to-pink-400/30", src: "/songs/alagasmaan.mp3" },
  { title: "Dooriyan", artist: "Pritam", note: "the one you always sing", hue: "from-rose-300/40 to-fuchsia-400/30", src: "/songs/dooriyan.mp3" },
  { title: "One Love", artist: "Shubh", note: "Turre madak madak ni tu hirni di chaal ni", hue: "from-violet-400/40 to-indigo-500/30", src: "/songs/onelove.mp3" },
  { title: "Tere Liye", artist: "Atif Aslam", note: "naacho penchoo!!!", hue: "from-pink-300/40 to-violet-400/30", src: "/songs/tereliye.mp3" },
];

export default function SongsSection() {
  const [active, setActive] = useState<number | null>(null);
  const audioPoolRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const currentRef = useRef<HTMLAudioElement | null>(null);

  // Preload all song audio elements once on mount so playback is near-instant
  useEffect(() => {
    const pool = audioPoolRef.current;
    songs.forEach((s) => {
      if (!pool.has(s.src)) {
        const a = new Audio();
        a.preload = "auto";
        a.src = s.src;
        a.volume = 0.4;
        // Hint the browser to start fetching/decoding
        try { a.load(); } catch { /* noop */ }
        pool.set(s.src, a);
      }
    });
    return () => {
      pool.forEach((a) => {
        a.pause();
        a.src = "";
      });
      pool.clear();
      currentRef.current = null;
    };
  }, []);

  const handleClick = (i: number, src: string) => {
    const isActive = active === i;
    const pool = audioPoolRef.current;

    // Stop whatever is currently playing
    if (currentRef.current) {
      currentRef.current.pause();
      currentRef.current.currentTime = 0;
    }

    if (isActive) {
      setActive(null);
      currentRef.current = null;
      return;
    }

    let audio = pool.get(src);
    if (!audio) {
      audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = 0.4;
      pool.set(src, audio);
    }
    audio.currentTime = 0;
    audio.onended = () => setActive((cur) => (cur === i ? null : cur));

    // Fire-and-forget; preloaded buffer makes this near-instant
    void audio.play().catch((err) => console.log("Playback blocked:", err));
    currentRef.current = audio;
    setActive(i);
  };

  return (
    <section className="relative px-6 py-24" id="songs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="font-script text-xl text-primary glow-text rotate-[2deg] inline-block">a tiny cassette box</p>
        <h2 className="font-display italic text-4xl gradient-text mt-2">songs that are us</h2>
      </motion.div>

      <ul className="space-y-5">
        {songs.map((s, i) => {
          const isActive = active === i;
          const tilt = i % 2 === 0 ? -2 : 2;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, rotate: tilt * 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: tilt }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              onClick={() => handleClick(i, s.src)}
              className="relative cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="song-glow"
                  className="absolute -inset-3 rounded-3xl blur-2xl -z-10"
                  style={{ background: "var(--gradient-glow)", opacity: 0.45 }}
                />
              )}
              <div className="glass rounded-2xl p-3 flex items-center gap-3 relative overflow-hidden">
                {/* vinyl */}
                <div className="relative w-16 h-16 shrink-0">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.hue} ${isActive ? "animate-spin-slow" : ""}`}
                    style={{
                      boxShadow: "inset 0 0 0 6px rgba(0,0,0,0.5), inset 0 0 0 7px rgba(255,255,255,0.15), 0 4px 18px -4px var(--glow-pink)",
                    }}
                  >
                    <div className="absolute inset-0 rounded-full" style={{
                      background: "repeating-radial-gradient(circle, rgba(0,0,0,0.25) 0 1px, transparent 1px 3px)",
                    }} />
                    <div className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary glow-pink" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-lg text-foreground truncate leading-tight">{s.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate uppercase tracking-wider">{s.artist}</p>
                  <p className="font-script text-[15px] text-primary/90 mt-0.5 truncate">{s.note}</p>
                </div>
                <div className="flex items-end gap-0.5 h-6 pr-1">
                  {[0, 0.15, 0.3, 0.45].map((d, k) => (
                    <span
                      key={k}
                      className="w-[3px] bg-primary rounded-full"
                      style={{
                        animation: isActive ? `eq 0.7s ease-in-out ${d}s infinite alternate` : "none",
                        height: isActive ? "60%" : "20%",
                        opacity: isActive ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
      <p className="mt-8 text-center font-script text-base text-muted-foreground italic">
        press one. let it play in your head.
      </p>
    </section>
  );
}
