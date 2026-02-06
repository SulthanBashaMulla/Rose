import { useState, useRef, useEffect } from "react";

const MusicButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Free ambient/piano music from a public source
    audioRef.current = new Audio(
      "https://cdn.pixabay.com/audio/2024/11/29/audio_d27dfc0843.mp3"
    );
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay; user needs to click
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      className={`music-btn ${isPlaying ? "playing" : ""}`}
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      title={isPlaying ? "Pause music" : "Play romantic music 🎵"}
    >
      {isPlaying ? (
        <div className="music-bars">
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <span className="text-lg">🎵</span>
      )}
    </button>
  );
};

export default MusicButton;
