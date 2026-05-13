import { useEffect, useRef, useState } from "react";

/**
 * Self-contained ambient pad — synthesized in-browser so we don't depend on
 * external audio files. Two soft sine voices + slow LFO + reverb-ish delay.
 * The `intimate` mode shifts to a lower, warmer chord for the letter section.
 */
export function useAmbient() {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const voicesRef = useRef<OscillatorNode[]>([]);
  const [playing, setPlaying] = useState(false);
  const [mode, setMode] = useState<"hero" | "intimate">("hero");

  const ensure = () => {
    if (ctxRef.current) return ctxRef.current;
    const Ctx =
      (window as unknown as { AudioContext: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
        .AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  };

  const buildVoices = (freqs: number[]) => {
    const ctx = ctxRef.current!;
    const master = masterRef.current!;
    voicesRef.current.forEach((o) => {
      try { o.stop(); } catch { /* noop */ }
    });
    voicesRef.current = [];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoG = ctx.createGain();
      osc.type = i === 0 ? "sine" : "triangle";
      osc.frequency.value = f;
      g.gain.value = 0.06 + i * 0.01;
      lfo.frequency.value = 0.08 + i * 0.03;
      lfoG.gain.value = 0.03;
      lfo.connect(lfoG).connect(g.gain);
      osc.connect(g).connect(master);
      osc.start();
      lfo.start();
      voicesRef.current.push(osc);
    });
  };

  const fade = (to: number, time = 2.5) => {
    const ctx = ctxRef.current!;
    const m = masterRef.current!;
    m.gain.cancelScheduledValues(ctx.currentTime);
    m.gain.linearRampToValueAtTime(to, ctx.currentTime + time);
  };

  const start = () => {
    const ctx = ensure();
    if (ctx.state === "suspended") ctx.resume();
    if (voicesRef.current.length === 0) {
      buildVoices(mode === "hero" ? [196, 261.6, 329.6] : [146.8, 220, 277.2]);
    }
    fade(0.18, 3);
    setPlaying(true);
  };

  const stop = () => {
    if (!ctxRef.current) return;
    fade(0, 1.5);
    setPlaying(false);
  };

  const toggle = () => (playing ? stop() : start());

  const setIntimate = (on: boolean) => {
    const next = on ? "intimate" : "hero";
    setMode(next);
    if (ctxRef.current && voicesRef.current.length) {
      buildVoices(on ? [146.8, 220, 277.2] : [196, 261.6, 329.6]);
    }
  };

  useEffect(() => () => {
    voicesRef.current.forEach((o) => { try { o.stop(); } catch { /* noop */ } });
    ctxRef.current?.close();
  }, []);

  return { playing, toggle, start, stop, setIntimate };
}

export function AmbientToggle({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={playing ? "pause ambient music" : "play ambient music"}
      className="glass rounded-full w-11 h-11 grid place-items-center text-foreground/90 hover:text-primary transition-colors"
    >
      <span className={`block ${playing ? "animate-spin-slow" : ""}`}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 6v12c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h1c.55 0 1 .45 1 1zm8-1h-1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h1c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        )}
      </span>
    </button>
  );
}
