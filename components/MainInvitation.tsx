"use client";
import { Mail, MapPin, Calendar, PartyPopper } from "lucide-react";

import Hero from "./sections/Hero";
import TimeAndPlace from "./sections/TimeAndPlace";
import Event from "./sections/Event";
import Message from "./sections/Message";
import Rsvp from "./sections/Rsvp";
import Footer from "./sections/Footer";
import { ConfettiWrapper } from "./ConfettiWrapper";

const MainInvitation = ({
  timeLeft,
}: {
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}) => {
  const menuItems = [
    {
      name: "Time & Place",
      href: "#time-place",
      icon: <MapPin className="w-4 h-4" />,
    },
    {
      name: "The Event",
      href: "#event",
      icon: <PartyPopper className="w-4 h-4" />,
    },
    { name: "Message", href: "#message", icon: <Mail className="w-4 h-4" /> },
    { name: "RSVP", href: "#rsvp", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <ConfettiWrapper>
      <div className="font-sans bg-gray-900 text-white">
        <Hero timeLeft={timeLeft} menuItems={menuItems} />
        <div className="relative">
          <TimeAndPlace />
          <Event />
          <Message />
          <Rsvp />
          <Footer />
        </div>
      </div>
    </ConfettiWrapper>
  );
};

export default MainInvitation;
