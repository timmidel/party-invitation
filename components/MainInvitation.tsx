"use client";
import { Mail, MapPin, Shirt, Calendar } from "lucide-react";

import Hero from "./sections/Hero";
import TimeAndPlace from "./sections/TimeAndPlace";
import Event from "./sections/Event";
import Message from "./sections/Message";
import Rsvp from "./sections/Rsvp";

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
      icon: <Shirt className="w-4 h-4" />,
    },
    { name: "Message", href: "#message", icon: <Mail className="w-4 h-4" /> },
    { name: "RSVP", href: "#rsvp", icon: <Calendar className="w-4 h-4" /> },
  ];

  return (
    <div className="font-sans bg-gray-900 text-white">
      <Hero timeLeft={timeLeft} menuItems={menuItems} />
      <div className="relative">
        <TimeAndPlace />
        <Event />
        <Message />
        <Rsvp />
      </div>
    </div>
  );
};

export default MainInvitation;
