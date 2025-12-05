"use client";

import OpenInvitation from "@/components/OpenInvitation";
import { useRef, useState } from "react";
import confetti from "canvas-confetti";
import MainInvitation from "@/components/MainInvitation";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const playMusic = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
        console.log("Audio playing successfully");
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }
  };
  const handleOpenInvitationClick = () => {
    playMusic();
    shootStars();
    // Delay slightly for the animation
    setTimeout(() => {
      setIsOpen(true);
    }, 50);
  };

  const shootStars = () => {
    const defaults = {
      spread: 400,
      ticks: 200,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };
    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };
    setTimeout(shoot, 0);
    setTimeout(shoot, 300);
    setTimeout(shoot, 500);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/bg_music2.mp3" preload="auto" loop />
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <MainInvitation />
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OpenInvitation onOpen={handleOpenInvitationClick} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
