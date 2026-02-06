import { useState, useCallback } from "react";

interface BloomingFlowerProps {
  onBurst?: () => void;
}

type Burst = {
  id: number;
  bx: number;
  by: number;
  br: number;
  emoji: string;
};

const BloomingFlower = ({ onBurst }: BloomingFlowerProps) => {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = useCallback(() => {
    onBurst?.();

    const newBursts: Burst[] = Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const distance = 70 + Math.random() * 60;

      return {
        id: Date.now() + i,
        bx: Math.cos(angle) * distance,
        by: Math.sin(angle) * distance - 40,
        br: Math.random() * 360,
        emoji: ["🌸", "💕", "✨", "💗", "🩷", "♡"][Math.floor(Math.random() * 6)],
      };
    });

    setBursts((prev) => [...prev, ...newBursts]);

    setTimeout(() => {
      setBursts((prev) =>
        prev.filter((b) => !newBursts.find((n) => n.id === b.id))
      );
    }, 2200);
  }, [onBurst]);

  /* 🌹 Rose-style petal layers */
  const petals = [
    // inner tight petals
    { r: 0, s: 0.55, y: -6, d: 0.6 },
    { r: 35, s: 0.6, y: -4, d: 0.7 },
    { r: -35, s: 0.6, y: -4, d: 0.7 },

    // middle petals
    { r: 0, s: 0.85, y: 4, d: 0.9 },
    { r: 60, s: 0.85, y: 6, d: 1.0 },
    { r: -60, s: 0.85, y: 6, d: 1.0 },

    // outer petals
    { r: 0, s: 1.1, y: 16, d: 1.2 },
    { r: 80, s: 1.1, y: 18, d: 1.3 },
    { r: -80, s: 1.1, y: 18, d: 1.3 },
  ];

  return (
    <div
      className="flower-container cursor-pointer"
      onClick={handleClick}
      role="button"
      aria-label="Tap the flower"
    >
      {/* Glow */}
      <div className="flower-glow" />

      {/* Petals */}
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            "--rotate": `${p.r}deg`,
            "--scale": p.s,
            "--spread": `${p.y}px`,
            "--delay": `${p.d}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Center */}
      <div className="flower-center" />

      {/* Stem & leaves */}
      <div className="stem">
        <div className="leaf leaf-left" />
        <div className="leaf leaf-right" />
      </div>

      {/* Burst emojis */}
      {bursts.map((b) => (
        <div
          key={b.id}
          className="burst-heart"
          style={{
            "--bx": `${b.bx}px`,
            "--by": `${b.by}px`,
            "--br": `${b.br}deg`,
          } as React.CSSProperties}
        >
          {b.emoji}
        </div>
      ))}
    </div>
  );
};

export default BloomingFlower;