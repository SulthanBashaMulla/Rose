import { useMemo } from "react";

interface FloatingParticlesProps {
  extraPetals?: boolean;
}

const FloatingParticles = ({ extraPetals = false }: FloatingParticlesProps) => {
  const hearts = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + Math.random() * 80}%`,
      size: `${14 + Math.random() * 10}px`,
      duration: `${8 + Math.random() * 6}s`,
      delay: `${Math.random() * 10}s`,
      drift: `${(Math.random() - 0.5) * 80}px`,
      spin: `${Math.random() * 90 - 45}deg`,
      emoji: ["♡", "💕", "🩷"][Math.floor(Math.random() * 3)],
    }));
  }, []);

  const petals = useMemo(() => {
    const count = extraPetals ? 25 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${8 + Math.random() * 8}px`,
      duration: `${7 + Math.random() * 8}s`,
      delay: `${Math.random() * 8}s`,
      drift: `${(Math.random() - 0.5) * 100}px`,
      spin: `${Math.random() * 720}deg`,
    }));
  }, [extraPetals]);

  const sparkles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3}px`,
      duration: `${3 + Math.random() * 4}s`,
      delay: `${Math.random() * 6}s`,
    }));
  }, []);

  return (
    <div className={extraPetals ? "petal-rain" : ""}>
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <div
          key={`heart-${heart.id}`}
          className="floating-heart"
          style={{
            left: heart.left,
            bottom: "-20px",
            "--size": heart.size,
            "--duration": heart.duration,
            "--delay": heart.delay,
            "--drift": heart.drift,
            "--spin": heart.spin,
          } as React.CSSProperties}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Falling petals */}
      {petals.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="falling-petal"
          style={{
            left: petal.left,
            top: "-20px",
            "--size": petal.size,
            "--duration": petal.duration,
            "--delay": petal.delay,
            "--drift": petal.drift,
            "--spin": petal.spin,
          } as React.CSSProperties}
        />
      ))}

      {/* Sparkle dots */}
      {sparkles.map((sparkle) => (
        <div
          key={`sparkle-${sparkle.id}`}
          className="sparkle-dot"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            "--size": sparkle.size,
            "--duration": sparkle.duration,
            "--delay": sparkle.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
