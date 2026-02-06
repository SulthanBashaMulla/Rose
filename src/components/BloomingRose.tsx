import { useState, useCallback } from "react";

interface BloomingRoseProps {
  onBurst?: () => void;
}

type Burst = {
  id: number;
  bx: number;
  by: number;
  br: number;
  emoji: string;
};

const BloomingRose = ({ onBurst }: BloomingRoseProps) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = useCallback(() => {
    onBurst?.();

    const newBursts: Burst[] = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const distance = 60 + Math.random() * 70;

      return {
        id: Date.now() + i,
        bx: Math.cos(angle) * distance,
        by: Math.sin(angle) * distance - 40,
        br: Math.random() * 360,
        emoji: ["🌹", "❤️", "💕", "✨", "🩷"][Math.floor(Math.random() * 5)],
      };
    });

    setBursts((prev) => [...prev, ...newBursts]);

    setTimeout(() => {
      setBursts((prev) =>
        prev.filter((b) => !newBursts.some((n) => n.id === b.id))
      );
    }, 2000);
  }, [onBurst]);

  // Spiral rose petals
  const petals = Array.from({ length: 20 }, (_, i) => ({
    rotate: `${i * 20}deg`,
    scale: 0.5 + i * 0.035,
    spread: `${-6 - i * 2}px`,
    delay: `${0.6 + i * 0.06}s`,
  }));

  return (
    <div
      className="rose-container"
      onClick={handleClick}
      role="button"
      aria-label="Tap the rose"
    >
      {/* Glow */}
      <div className="rose-glow" />

      {/* Petals */}
      {petals.map((p, i) => (
        <div
          key={i}
          className="rose-petal"
          style={
            {
              "--rotate": p.rotate,
              "--scale": p.scale,
              "--spread": p.spread,
              "--delay": p.delay,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Center */}
      <div className="rose-center" />

      {/* Stem */}
      <div className="rose-stem">
        <span className="rose-leaf left" />
        <span className="rose-leaf right" />
        <span className="rose-thorn t1" />
        <span className="rose-thorn t2" />
      </div>

      {/* Click burst */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="rose-burst"
          style={
            {
              "--bx": `${b.bx}px`,
              "--by": `${b.by}px`,
              "--br": `${b.br}deg`,
            } as React.CSSProperties
          }
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
};

export default BloomingRose;