import { useEffect, useMemo, useState } from "react";

export function StarField() {
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.4,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 2,
      })),
    []
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 6 + 3,
        delay: Math.random() * 14,
        duration: Math.random() * 14 + 18,
        hue: Math.random() > 0.5 ? "var(--glow-pink)" : "var(--glow-violet)",
      })),
    []
  );

  // Shooting stars — re-trigger periodically
  const [shoots, setShoots] = useState<{ id: number; top: number; left: number; ang: number }[]>([]);
  useEffect(() => {
    let n = 0;
    const tick = () => {
      n += 1;
      setShoots((s) =>
        [
          ...s.slice(-3),
          {
            id: n,
            top: Math.random() * 40,
            left: Math.random() * 30,
            ang: -15 - Math.random() * 25,
          },
        ]
      );
    };
    tick();
    const iv = setInterval(tick, 6500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
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

      {/* shooting stars */}
      {shoots.map((s) => (
        <span
          key={s.id}
          className="absolute"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, white, transparent)",
            filter: "drop-shadow(0 0 6px rgba(255,200,240,0.8))",
            animation: "shoot 1.6s ease-out forwards",
            ["--ang" as never]: `${s.ang}deg`,
          }}
        />
      ))}

      {/* light leaks */}
      <div
        className="absolute -top-32 -left-20 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl animate-leak"
        style={{ background: "radial-gradient(circle, var(--glow-pink), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[26rem] h-[26rem] rounded-full opacity-30 blur-3xl animate-leak"
        style={{
          background: "radial-gradient(circle, var(--glow-violet), transparent 70%)",
          animationDelay: "3s",
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[22rem] h-[22rem] rounded-full opacity-25 blur-3xl animate-leak"
        style={{
          background: "radial-gradient(circle, var(--glow-lavender), transparent 70%)",
          animationDelay: "5s",
        }}
      />
    </div>
  );
}
