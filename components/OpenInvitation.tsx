"use client";
import { MailOpen } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import GoldenButton from "./ui/golden_button";

interface OpenInvitationProps {
  onOpen: () => void;
}

export default function OpenInvitation({ onOpen }: OpenInvitationProps) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <Image
        src="/images/elegant_purple_bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover opacity-5"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col items-center text-center space-y-4 md:space-y-6 px-6 py-8 max-w-full w-full"
      >
        <h1 className="font-script leading-[1.3] text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_8px_rgba(232,165,25,0.4)] w-full h-full">
          Victory Party Of
        </h1>

        <motion.div whileHover={{ scale: 1.05 }} className="relative group">
          {/* Glowing effect behind image */}
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 rounded-full blur-xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border-4 md:border-[6px] border-transparent bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-1 overflow-hidden shadow-[0_8px_32px_rgba(232,165,25,0.35)] group-hover:shadow-[0_12px_48px_rgba(232,165,25,0.5)]">
            {/* Inner white border for cleaner look */}
            <div className="w-full h-full rounded-full overflow-hidden bg-whit">
              <img
                src="https://picsum.photos/600/600?grayscale"
                alt="Tracey portrait"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <h2 className="font-script leading-[1.3] text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(232,165,25,0.5)] w-full px-2">
          Tracey Faye Abellon
        </h2>

        <GoldenButton onClick={onOpen} className="mt-4 md:mt-6">
          <MailOpen className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          Open Invitation
        </GoldenButton>
      </motion.div>
    </div>
  );
}
