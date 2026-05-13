import { motion } from "framer-motion";

const memories = [
  { caption: "the night we couldn't stop laughing", rotate: -5, hue: "from-pink-300/30 to-purple-400/20" },
  { caption: "summer, golden hour, you", rotate: 4, hue: "from-amber-200/30 to-pink-300/20" },
  { caption: "our 3am conversations", rotate: -3, hue: "from-violet-300/30 to-indigo-400/20" },
  { caption: "that ridiculous trip", rotate: 6, hue: "from-fuchsia-300/30 to-purple-400/20" },
  { caption: "you, exactly as you are", rotate: -2, hue: "from-rose-300/30 to-pink-400/20" },
];

export default function MemoriesSection() {
  return (
    <section className="relative px-6 py-24" id="memories">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="font-script text-xl text-primary glow-text">a little scrapbook</p>
        <h2 className="font-display text-4xl gradient-text mt-2">our moments</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xs mx-auto">
          Some frames from the universe we built together.
        </p>
      </motion.div>

      <div className="space-y-10">
        {memories.map((m, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 60, rotate: m.rotate * 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileTap={{ rotate: 0, scale: 1.04 }}
            className="mx-auto w-[78%] bg-white/95 p-3 pb-14 rounded-sm shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] relative"
            style={{ transformOrigin: "center" }}
          >
            <div
              className={`aspect-[4/5] rounded-sm bg-gradient-to-br ${m.hue} relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_50%)]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-script text-3xl text-white/40 select-none">memory {i + 1}</span>
              </div>
            </div>
            <figcaption className="absolute bottom-3 left-0 right-0 text-center font-script text-lg text-neutral-700">
              {m.caption}
            </figcaption>
            {/* tape */}
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/30 backdrop-blur-sm border border-white/20 rotate-[-2deg]" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
