import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (matchMedia("(hover: none)").matches) {
      setHidden(true);
      return;
    }
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (hidden) return null;
  return (
    <>
      <div
        className="pointer-events-none fixed z-[80] rounded-full mix-blend-screen"
        style={{
          left: pos.x - 110,
          top: pos.y - 110,
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, oklch(0.85 0.18 350 / 0.35), oklch(0.7 0.18 310 / 0.18) 40%, transparent 70%)",
          transition: "left 120ms ease-out, top 120ms ease-out",
          filter: "blur(8px)",
        }}
      />
      <div
        className="pointer-events-none fixed z-[81] rounded-full"
        style={{
          left: pos.x - 4,
          top: pos.y - 4,
          width: 8,
          height: 8,
          background: "white",
          boxShadow: "0 0 12px white, 0 0 24px var(--glow-pink)",
          transition: "left 60ms linear, top 60ms linear",
        }}
      />
    </>
  );
}
