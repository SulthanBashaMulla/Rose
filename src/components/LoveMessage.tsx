interface LoveMessageProps {
  showSecondMessage: boolean;
}

const LoveMessage = ({ showSecondMessage }: LoveMessageProps) => {
  return (
    <div className="flex flex-col items-center gap-6 mt-8 px-6">
      {/* Main message */}
      <div className="message-reveal" style={{ "--msg-delay": "5.5s" } as React.CSSProperties}>
        <p className="font-romantic text-rose-light text-2xl sm:text-3xl md:text-4xl leading-relaxed max-w-lg mx-auto">
          For my favorite person in the whole world 🌸
        </p>
      </div>

      <div className="message-reveal" style={{ "--msg-delay": "7s" } as React.CSSProperties}>
        <p className="font-romantic text-blush text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-md mx-auto">
          I love you more every day 💕
        </p>
      </div>

      <div className="message-reveal" style={{ "--msg-delay": "8.5s" } as React.CSSProperties}>
        <p className="font-elegant text-lavender text-base sm:text-lg italic tracking-wide opacity-80">
          — tap the flower for a little surprise ✨
        </p>
      </div>

      {/* Second message after interaction */}
      {showSecondMessage && (
        <div className="animate-fade-in mt-4">
          <p className="font-romantic text-gold-glow text-xl sm:text-2xl md:text-3xl leading-relaxed max-w-md mx-auto">
            You're my forever flower ♡
          </p>
          <p className="font-elegant text-peach text-sm sm:text-base mt-3 italic tracking-wider opacity-70">
            Every moment with you is magic 🌙
          </p>
        </div>
      )}
    </div>
  );
};

export default LoveMessage;
