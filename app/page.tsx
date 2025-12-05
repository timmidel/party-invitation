"use client";

import OpenInvitation from "@/components/OpenInvitation";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <OpenInvitation onOpen={() => {}} />
    </>
  );
}
