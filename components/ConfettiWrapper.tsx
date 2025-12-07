"use client";
import confetti from "canvas-confetti";

export function ConfettiWrapper({ children }: { children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent) => {
    // Check if the clicked element is a button, input, or anchor tag
    const target = e.target as HTMLElement;
    const isInteractive = target.closest(
      "button, input, textarea, a, select, .no-confetti"
    );

    // Don't trigger confetti if clicking on interactive elements
    if (isInteractive) {
      return;
    }

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    const defaults = {
      spread: 300,
      ticks: 50,
      gravity: 1,
      decay: 0.34,
      startVelocity: 15,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
      origin: { x, y },
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 2,
        scalar: 1.2,
        shapes: ["star"],
      });
      confetti({
        ...defaults,
        particleCount: 1,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <div onClick={handleClick} className="min-h-screen">
      {children}
    </div>
  );
}
