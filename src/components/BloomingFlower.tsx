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

    const newBursts = Array.from({ length: 14 }, (_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const distance = 70 + Math.random() * 60;

      return {
        id: Date.now() + i,
        bx: Math.cos(angle) * distance,
        by: Math.sin(angle) * distance - 40,
        br: Math.random() * 360,
        emoji: ["🌹", "❤️", "✨", "💕", "🩷"][Math.floor(Math.random() * 5)],
      };
    });

    setBursts((p) => [...p, ...newBursts]);

    setTimeout(() => {
      setBursts((p) => p.filter((b) => !newBursts.find((n) => n.id === b.id)));
    }, 2200);
  }, [onBurst]);

  const rosePetals = Array.from({ length: 18 }, (_, i) => ({
    rotate: `${i * 18}deg`,
    delay: `${0.8 + i * 0.08}s`,
    spread: `${-6 - i * 2}px`,
    scale: 0.55 + i * 0.035,
  }));

  return (
    <div
      className="rose-container cursor-pointer"
      onClick={handleClick}
      role="button"
      aria-label="Click the rose"
    >
      <div className="rose-glow" />

      {rosePetals.map((p, i) => (
        <div
          key={i}
          className="rose-petal"
          style={{
            "--rotate": p.rotate,
            "--delay": p.delay,
            "--spread": p.spread,
            "--scale": p.scale,
          } as React.CSSProperties}
        />
      ))}

      <div className="rose-center" />

      <div className="rose-stem">
        <div className="rose-leaf left" />
        <div className="rose-leaf right" />
        <div className="rose-thorn t1" />
        <div className="rose-thorn t2" />
      </div>

      {bursts.map((b) => (
        <div
          key={b.id}
          className="rose-burst"
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

export default BloomingRose;