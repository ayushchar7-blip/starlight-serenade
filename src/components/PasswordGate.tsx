import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type Props = {
  expectedDate: string; // format: MMDD or YYYY-MM-DD; we'll be lenient
  hint?: string;
  onUnlock: () => void;
};

function normalize(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export default function PasswordGate({ expectedDate, hint, onUnlock }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const a = normalize(value);
    const b = normalize(expectedDate);
    // accept either MMDD, DDMM, or full date matching last 4/8 digits
    const ok =
      a === b ||
      a === b.slice(-4) ||
      (a.length === 4 && b.endsWith(a)) ||
      (a.length === 8 && b.replace(/\D/g, "") === a);
    if (ok) {
      onUnlock();
    } else {
      setError(true);
      setShake((s) => s + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-6"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="text-center mb-10"
      >
        <p className="font-script text-2xl text-primary glow-text mb-3">a little secret door</p>
        <h1 className="font-display text-5xl gradient-text leading-tight">
          For you,<br />my dearest
        </h1>
        <p className="mt-5 text-sm text-muted-foreground max-w-xs mx-auto leading-relaxed">
          Enter the date only we would remember to step inside.
        </p>
      </motion.div>

      <motion.form
        key={shake}
        onSubmit={handleSubmit}
        animate={error ? { x: [0, -8, 8, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="glass rounded-3xl p-6 w-full max-w-sm"
      >
        <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
          Our date
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="MMDD"
          className="w-full bg-transparent border-0 border-b border-white/20 focus:border-primary focus:outline-none py-3 text-2xl font-display text-center tracking-[0.4em] text-foreground placeholder:text-white/20"
        />
        {hint && (
          <p className="mt-3 text-center text-xs text-muted-foreground italic">{hint}</p>
        )}
        {error && (
          <p className="mt-3 text-center text-xs text-primary">not quite — try again ✨</p>
        )}
        <button
          type="submit"
          className="mt-6 w-full rounded-full py-3 text-sm font-medium tracking-wide text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98] glow-pink"
          style={{ background: "var(--gradient-glow)" }}
        >
          Open
        </button>
      </motion.form>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-10 text-xs text-muted-foreground"
      >
        made with all my heart
      </motion.p>
    </motion.div>
  );
}
