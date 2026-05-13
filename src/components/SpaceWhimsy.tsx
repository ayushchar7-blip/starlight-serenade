import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const cowMessages = [
  "moo love you very mooch.",
  "you are out of this world.",
  "certified galaxy favourite.",
  "my heart did a little mooo.",
];

const alienMessages = [
  "human approved 💫",
  "we travelled galaxies for this birthday.",
  "you glow softer than our suns.",
];

function HiddenNote({ text, onClose, x, y }: { text: string; onClose: () => void; x: number; y: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      onClick={(e) => { e.stopPropagation(); onClose(); }}
      className="paper px-3 py-2 font-script text-[15px] leading-tight rounded-[3px] shadow-md max-w-[10rem] text-center"
      style={{ position: "absolute", top: y, left: x, transform: "rotate(-3deg)", zIndex: 50 }}
    >
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 tape rotate-[-3deg]" />
      {text}
    </motion.div>
  );
}

export function CowOnRocket() {
  const [msg, setMsg] = useState<string | null>(null);
  const pick = () => setMsg(cowMessages[Math.floor(Math.random() * cowMessages.length)]);

  return (
    <div className="absolute right-2 top-[38%] z-30 pointer-events-none" style={{ width: 90 }}>
      <motion.button
        onClick={pick}
        animate={{ y: [0, -10, 0], rotate: [-4, -1, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto block relative"
        aria-label="cow on a rocket"
        style={{ filter: "drop-shadow(0 6px 14px oklch(0.2 0.05 290 / 0.6))" }}
      >
        <svg viewBox="0 0 100 140" width="80" height="112">
          {/* exhaust */}
          <motion.g
            animate={{ opacity: [0.4, 0.9, 0.5], scaleY: [0.8, 1.1, 0.85] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "50px 120px" }}
          >
            <ellipse cx="50" cy="128" rx="6" ry="10" fill="oklch(0.85 0.16 350 / 0.7)" />
            <ellipse cx="50" cy="132" rx="3" ry="6" fill="oklch(0.95 0.05 80 / 0.85)" />
          </motion.g>
          {/* rocket body */}
          <path d="M50 30 C 65 30 72 55 72 80 L72 110 C72 116 66 120 50 120 C34 120 28 116 28 110 L28 80 C28 55 35 30 50 30 Z"
            fill="oklch(0.92 0.04 320)" stroke="oklch(0.35 0.08 295)" strokeWidth="1.5" />
          {/* fins */}
          <path d="M28 95 L18 118 L28 112 Z" fill="oklch(0.78 0.12 350)" stroke="oklch(0.35 0.08 295)" strokeWidth="1.2" />
          <path d="M72 95 L82 118 L72 112 Z" fill="oklch(0.78 0.12 350)" stroke="oklch(0.35 0.08 295)" strokeWidth="1.2" />
          {/* window */}
          <circle cx="50" cy="70" r="18" fill="oklch(0.25 0.06 290)" stroke="oklch(0.35 0.08 295)" strokeWidth="1.5" />
          <circle cx="50" cy="70" r="18" fill="url(#glass)" opacity="0.5" />
          {/* cow inside window */}
          <g>
            {/* head */}
            <ellipse cx="50" cy="72" rx="11" ry="9" fill="oklch(0.97 0.01 320)" stroke="oklch(0.35 0.08 295)" strokeWidth="1" />
            {/* spots */}
            <ellipse cx="45" cy="69" rx="2.5" ry="1.8" fill="oklch(0.35 0.05 290)" />
            <ellipse cx="55" cy="74" rx="2" ry="1.4" fill="oklch(0.35 0.05 290)" />
            {/* muzzle */}
            <ellipse cx="50" cy="76" rx="5" ry="3" fill="oklch(0.88 0.06 20)" />
            <circle cx="48" cy="76" r="0.6" fill="oklch(0.3 0.05 20)" />
            <circle cx="52" cy="76" r="0.6" fill="oklch(0.3 0.05 20)" />
            {/* eyes */}
            <circle cx="46.5" cy="71" r="0.9" fill="oklch(0.2 0.04 290)" />
            <circle cx="53.5" cy="71" r="0.9" fill="oklch(0.2 0.04 290)" />
            {/* ears */}
            <ellipse cx="40" cy="68" rx="2.2" ry="1.4" fill="oklch(0.97 0.01 320)" stroke="oklch(0.35 0.08 295)" strokeWidth="0.8" transform="rotate(-25 40 68)" />
            <ellipse cx="60" cy="68" rx="2.2" ry="1.4" fill="oklch(0.97 0.01 320)" stroke="oklch(0.35 0.08 295)" strokeWidth="0.8" transform="rotate(25 60 68)" />
            {/* tiny astronaut helmet ring */}
            <circle cx="50" cy="72" r="13" fill="none" stroke="oklch(0.95 0.05 320 / 0.6)" strokeWidth="0.6" />
          </g>
          {/* nose cone shine */}
          <path d="M44 36 C46 32 54 32 56 36" stroke="oklch(1 0 0 / 0.4)" strokeWidth="1.2" fill="none" />
          <defs>
            <radialGradient id="glass" cx="35%" cy="30%">
              <stop offset="0%" stopColor="white" stopOpacity="0.7" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </motion.button>

      <AnimatePresence>
        {msg && <HiddenNote text={msg} onClose={() => setMsg(null)} x={-110} y={20} />}
      </AnimatePresence>
    </div>
  );
}

function Alien({
  top,
  left,
  hue = "oklch(0.78 0.16 150)",
  flip = false,
}: { top: string; left: string; hue?: string; flip?: boolean }) {
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <div className="absolute z-30" style={{ top, left, width: 56 }}>
      <motion.button
        onClick={() => setMsg(alienMessages[Math.floor(Math.random() * alienMessages.length)])}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="block"
        aria-label="tiny alien"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <svg viewBox="0 0 60 70" width="48" height="56">
          {/* body */}
          <ellipse cx="30" cy="36" rx="16" ry="20" fill={hue} stroke="oklch(0.3 0.06 150)" strokeWidth="1.2" />
          {/* belly */}
          <ellipse cx="30" cy="42" rx="9" ry="11" fill="oklch(0.92 0.04 150 / 0.6)" />
          {/* eye */}
          <ellipse cx="30" cy="30" rx="9" ry="11" fill="oklch(0.97 0.02 320)" stroke="oklch(0.3 0.06 150)" strokeWidth="1" />
          <circle cx="32" cy="32" r="4" fill="oklch(0.2 0.04 290)" />
          <circle cx="33.5" cy="30.5" r="1.2" fill="white" />
          {/* antenna */}
          <path d="M30 14 Q28 8 32 4" stroke="oklch(0.3 0.06 150)" strokeWidth="1.4" fill="none" />
          <circle cx="32" cy="3.5" r="2.2" fill="oklch(0.85 0.16 350)" />
          {/* arms */}
          <path d="M14 38 q-6 4 -4 10" stroke="oklch(0.3 0.06 150)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <path d="M46 38 q6 4 4 10" stroke="oklch(0.3 0.06 150)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        </svg>
      </motion.button>
      <AnimatePresence>
        {msg && <HiddenNote text={msg} onClose={() => setMsg(null)} x={-40} y={-30} />}
      </AnimatePresence>
    </div>
  );
}

function Planet({ top, left, size = 70, ring = true }: { top: string; left: string; size?: number; ring?: boolean }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute z-10 pointer-events-none"
      style={{ top, left, width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <defs>
          <radialGradient id={`p-${top}-${left}`} cx="35%" cy="32%">
            <stop offset="0%" stopColor="oklch(0.92 0.08 330)" />
            <stop offset="60%" stopColor="oklch(0.62 0.16 310)" />
            <stop offset="100%" stopColor="oklch(0.32 0.12 290)" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="32" fill={`url(#p-${top}-${left})`} />
        <ellipse cx="42" cy="44" rx="6" ry="3" fill="oklch(1 0 0 / 0.18)" />
        <ellipse cx="58" cy="58" rx="8" ry="3" fill="oklch(0 0 0 / 0.15)" />
        {ring && (
          <ellipse cx="50" cy="52" rx="46" ry="9" fill="none"
            stroke="oklch(0.85 0.12 330 / 0.6)" strokeWidth="2" transform="rotate(-18 50 52)" />
        )}
      </svg>
    </motion.div>
  );
}

function Ufo({ top, left }: { top: string; left: string }) {
  return (
    <motion.div
      animate={{ x: [0, 12, -8, 0], y: [0, -4, 2, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="absolute z-10 pointer-events-none opacity-70"
      style={{ top, left, width: 50 }}
    >
      <svg viewBox="0 0 80 60" width="50" height="38">
        <ellipse cx="40" cy="32" rx="28" ry="6" fill="oklch(0.55 0.1 290)" stroke="oklch(0.3 0.06 290)" strokeWidth="1" />
        <path d="M22 30 q18 -22 36 0" fill="oklch(0.85 0.08 320 / 0.7)" stroke="oklch(0.3 0.06 290)" strokeWidth="1" />
        <circle cx="28" cy="36" r="1.5" fill="oklch(0.95 0.1 80)" />
        <circle cx="40" cy="37" r="1.5" fill="oklch(0.85 0.16 350)" />
        <circle cx="52" cy="36" r="1.5" fill="oklch(0.78 0.16 150)" />
        <path d="M30 38 L40 56 L50 38 Z" fill="oklch(0.85 0.16 350 / 0.25)" />
      </svg>
    </motion.div>
  );
}

export function HeroWhimsy() {
  return (
    <>
      <Planet top="58%" left="-30px" size={90} ring />
      <Ufo top="22%" left="55%" />
      <Alien top="70%" left="20px" />
      <CowOnRocket />
    </>
  );
}

export function FloatingDoodles() {
  return (
    <>
      <Alien top="14%" left="78%" hue="oklch(0.78 0.16 320)" flip />
      <Planet top="6%" left="60%" size={50} ring={false} />
    </>
  );
}

export function SecretEnding() {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="px-6 pb-16 pt-4 text-center">
      <motion.button
        onClick={() => setRevealed(true)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="font-script text-lg text-muted-foreground italic hover:text-primary transition-colors"
      >
        you stayed till the end?
      </motion.button>
      <AnimatePresence>
        {revealed && (
          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display italic text-2xl gradient-text glow-text leading-snug max-w-[18rem] mx-auto"
          >
            then you already know — every star up there is just a love note i couldn't say out loud.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
