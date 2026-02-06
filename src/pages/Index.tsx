import { useState } from "react";
import StarryBackground from "@/components/StarryBackground";
import BloomingFlower from "@/components/BloomingFlower";
import FloatingParticles from "@/components/FloatingParticles";
import LoveMessage from "@/components/LoveMessage";
import MusicButton from "@/components/MusicButton";

const Index = () => {
  const [hasClicked, setHasClicked] = useState(false);
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  const handleFlowerBurst = () => {
    if (!hasClicked) {
      setHasClicked(true);
      // Delay second message slightly for dramatic effect
      setTimeout(() => setShowSecondMessage(true), 800);
    }
  };

  return (
    <div className="night-sky min-h-screen flex flex-col items-center justify-center relative">
      {/* Starry night */}
      <StarryBackground />

      {/* Floating particles */}
      <FloatingParticles extraPetals={hasClicked} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center py-12 sm:py-16">
        {/* Flower */}
        <BloomingFlower onBurst={handleFlowerBurst} />

        {/* Love messages */}
        <LoveMessage showSecondMessage={showSecondMessage} />
      </div>

      {/* Music button */}
      <MusicButton />

      {/* Footer */}
      <span className="love-footer">
        Made with love ♡
      </span>
    </div>
  );
};

export default Index;
