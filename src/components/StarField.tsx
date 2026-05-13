import { useMemo } from "react";

export function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 12,
        duration: Math.random() * 14 + 16,
        hue: Math.random() > 0.5 ? "var(--glow-pink)" : "var(--glow-violet)",
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Static twinkling stars */}
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}
      {/* Floating glow particles */}
      {particles.map((p) => (
        <span
          key={`p-${p.id}`}
          className="absolute rounded-full animate-drift blur-[2px]"
          style={{
            left: `${p.left}%`,
            bottom: `-10vh`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${p.hue}, transparent 70%)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      {/* Soft auroras */}
      <div
        className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl animate-float-slow"
        style={{ background: "radial-gradient(circle, var(--glow-pink), transparent 70%)" }}
      />
      <div
        className="absolute top-1/2 -right-32 w-[26rem] h-[26rem] rounded-full opacity-30 blur-3xl animate-float-slow"
        style={{
          background: "radial-gradient(circle, var(--glow-violet), transparent 70%)",
          animationDelay: "3s",
        }}
      />
    </div>
  );
}
