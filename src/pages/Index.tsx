import { useState } from "react";
import StarryBackground from "@/components/StarryBackground";
import BloomingRose from "@/components/BloomingRose";
import FloatingParticles from "@/components/FloatingParticles";
import LoveMessage from "@/components/LoveMessage";
import MusicButton from "@/components/MusicButton";

const Index = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  const handleRoseBloom = () => {
    if (!hasClicked) {
      setHasClicked(true);
      setTimeout(() => setShowSecondMessage(true), 800);
    }
  };

  return (
    <div className="night-sky min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Starry night background */}
      <StarryBackground />

      {/* Floating petals / particles */}
      <FloatingParticles extraPetals={hasClicked} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center py-12 sm:py-16">
        {/* Rose */}
        <BloomingRose onBurst={handleRoseBloom} />

        {/* Love messages */}
        <LoveMessage showSecondMessage={showSecondMessage} />
      </div>

      {/* Music */}
      <MusicButton />

      {/* Footer */}
      <span className="love-footer mt-6">
        Made with love ♡
      </span>
    </div>
  );
};

export default Index;