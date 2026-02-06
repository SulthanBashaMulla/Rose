import { useState, useCallback } from "react";

interface BloomingFlowerProps {
  onBurst?: () => void;
}

const BloomingFlower = ({ onBurst }: BloomingFlowerProps) => {
  const [bursts, setBursts] = useState<Array<{ id: number; x: number; y: number; bx: number; by: number; br: number; emoji: string }>>([]);

  const handleClick = useCallback(() => {
    onBurst?.();
    
    // Create burst hearts/sparkles
    const newBursts = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const distance = 60 + Math.random() * 80;
      return {
        id: Date.now() + i,
        x: 0,
        y: 0,
        bx: Math.cos(angle) * distance,
        by: Math.sin(angle) * distance - 40,
        br: Math.random() * 360,
        emoji: ["💕", "🌸", "✨", "💗", "🩷", "♡"][Math.floor(Math.random() * 6)],
      };
    });
    
    setBursts((prev) => [...prev, ...newBursts]);
    
    // Clean up after animation
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.find((nb) => nb.id === b.id)));
    }, 2000);
  }, [onBurst]);

  // Inner petals (lighter pink, closer to center)
  const innerPetals = Array.from({ length: 8 }, (_, i) => ({
    rotate: `${(i / 8) * 360}deg`,
    delay: `${1.5 + i * 0.15}s`,
    spread: "-10px",
  }));

  // Outer petals (deeper pink, spread further)
  const outerPetals = Array.from({ length: 10 }, (_, i) => ({
    rotate: `${(i / 10) * 360 + 18}deg`,
    delay: `${2.5 + i * 0.12}s`,
    spread: "-20px",
  }));

  return (
    <div 
      className="flower-container cursor-pointer" 
      onClick={handleClick}
      role="button"
      aria-label="Click the flower for a surprise"
    >
      {/* Glow effect */}
      <div className="flower-glow" />

      {/* Outer petals */}
      {outerPetals.map((petal, i) => (
        <div
          key={`outer-${i}`}
          className="petal petal-outer"
          style={{
            "--rotate": petal.rotate,
            "--delay": petal.delay,
            "--spread": petal.spread,
          } as React.CSSProperties}
        />
      ))}

      {/* Inner petals */}
      {innerPetals.map((petal, i) => (
        <div
          key={`inner-${i}`}
          className="petal petal-inner"
          style={{
            "--rotate": petal.rotate,
            "--delay": petal.delay,
            "--spread": petal.spread,
          } as React.CSSProperties}
        />
      ))}

      {/* Center */}
      <div className="flower-center" />

      {/* Stem */}
      <div className="stem">
        <div className="leaf leaf-left" style={{ "--leaf-rotate": "-30deg" } as React.CSSProperties} />
        <div className="leaf leaf-right" style={{ "--leaf-rotate": "30deg" } as React.CSSProperties} />
      </div>

      {/* Burst effects */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="burst-heart"
          style={{
            left: "50%",
            top: "50%",
            "--bx": `${burst.bx}px`,
            "--by": `${burst.by}px`,
            "--br": `${burst.br}deg`,
            fontSize: `${Math.random() * 12 + 14}px`,
          } as React.CSSProperties}
        >
          {burst.emoji}
        </div>
      ))}
    </div>
  );
};

export default BloomingFlower;
