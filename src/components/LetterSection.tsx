import { motion } from "framer-motion";

export default function LetterSection() {
  return (
    <section className="relative px-6 py-28" id="letter">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
        className="text-center mb-10"
      >
        <p className="font-script text-xl text-primary glow-text">a letter, just for you</p>
        <h2 className="font-display text-4xl gradient-text mt-2">read me slowly</h2>
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="glass rounded-3xl p-7 leading-relaxed text-[15px] text-foreground/90 space-y-5 font-display"
      >
        <p className="font-script text-2xl text-primary">my dearest,</p>
        <p>
          If I had to count the things I love about you, I would run out of stars long before I ran out of reasons.
          You are the soft place the world keeps sending me back to.
        </p>
        <p>
          Thank you for the laughter that doesn't know how to be quiet, for the calls that turn into mornings,
          for being the kind of person who makes ordinary days feel like something worth remembering.
        </p>
        <p>
          On your birthday, I want you to know — you are deeply, ridiculously loved. Not just today.
          Every day. In every version of you, in every chapter still to come.
        </p>
        <p className="font-script text-2xl text-primary text-right pt-4">
          always yours,<br />— me 💫
        </p>
      </motion.article>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-16 text-center"
      >
        <p className="font-script text-3xl gradient-text glow-text">happy birthday</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          another trip around the sun
        </p>
      </motion.div>
    </section>
  );
}
