import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

type Props = {
  expectedDate: string;
  hint?: string;
  onUnlock: () => void;
};

// Set this to manually override the password without editing parent files
const MANUAL_PASSWORD: string | undefined = undefined;

function normalize(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export default function PasswordGate({ expectedDate, hint, onUnlock }: Props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const effectivePassword = MANUAL_PASSWORD ?? expectedDate;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const entered = normalize(value);
    const expected = normalize(effectivePassword);
    if (entered === expected) {
      setError(null);
      onUnlock();
    } else {
      setError("That's not quite right ✦ try again");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.h1
        className="font-script text-5xl md:text-6xl text-foreground mb-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        happy birthday ✦
      </motion.h1>
      <motion.p
        className="text-muted-foreground mb-8 max-w-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        enter the secret code to unlock your surprise
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4 w-full max-w-xs"
      >
        <input
          type="password"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="• • • • • •"
          className="w-full text-center text-xl tracking-[0.4em] bg-background/40 border border-border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          unlock
        </button>
        {hint && (
          <p className="text-xs text-muted-foreground/70 italic mt-2">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-destructive mt-1">{error}</p>
        )}
      </motion.form>
    </motion.section>
  );
}
