import { motion } from "framer-motion";

const songs = [
  { title: "Cornelia Street", artist: "Taylor Swift", note: "for late-night drives" },
  { title: "Pink + White", artist: "Frank Ocean", note: "your golden hour song" },
  { title: "Lover", artist: "Taylor Swift", note: "the one you always sing" },
  { title: "Sunsetz", artist: "Cigarettes After Sex", note: "soft summer nights" },
  { title: "From The Start", artist: "Laufey", note: "us, basically" },
];

export default function SongsSection() {
  return (
    <section className="relative px-6 py-24" id="songs">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="font-script text-xl text-primary glow-text">the soundtrack</p>
        <h2 className="font-display text-4xl gradient-text mt-2">songs that are us</h2>
      </motion.div>

      <ul className="space-y-3">
        {songs.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="glass rounded-2xl p-4 flex items-center gap-4 group hover:border-primary/40 transition-colors"
          >
            <div
              className="w-12 h-12 shrink-0 rounded-full grid place-items-center glow-pink"
              style={{ background: "var(--gradient-glow)" }}
            >
              <PlayIcon />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-lg text-foreground truncate">{s.title}</p>
              <p className="text-xs text-muted-foreground truncate">
                {s.artist} · <span className="italic font-script text-sm text-primary/80">{s.note}</span>
              </p>
            </div>
            <div className="flex items-end gap-0.5 h-6 opacity-70 group-hover:opacity-100 transition">
              <Bar delay="0s" />
              <Bar delay="0.2s" />
              <Bar delay="0.4s" />
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-primary-foreground ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function Bar({ delay }: { delay: string }) {
  return (
    <span
      className="w-[3px] bg-primary rounded-full"
      style={{
        animation: `eq 1s ease-in-out ${delay} infinite alternate`,
        height: "60%",
      }}
    />
  );
}
