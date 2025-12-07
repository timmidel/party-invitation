"use client";

import OpenInvitation from "@/components/OpenInvitation";
import { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import MainInvitation from "@/components/MainInvitation";
import { AnimatePresence, motion } from "framer-motion";

const COUNTDOWN_TARGET_DATE = "2025-12-21T17:00:00";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const targetDate = new Date(COUNTDOWN_TARGET_DATE);
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setTimeLeft(timeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const playMusic = async () => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.5;
        // await audioRef.current.play();
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
      ticks: 300,
      gravity: 0.1,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };
    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 50,
        scalar: 1.2,
        shapes: ["star"],
      });
      confetti({
        ...defaults,
        particleCount: 20,
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
            <MainInvitation timeLeft={timeLeft} />
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
