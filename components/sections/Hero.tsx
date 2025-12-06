"use client";
import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface HeroProps {
  timeLeft: TimeLeft;
  menuItems: MenuItem[];
}

const Hero = ({ timeLeft, menuItems }: HeroProps) => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center bg-background p-6 font-playfair relative"
    >
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/marble_purple_bg.jpeg"
          alt="Background"
          fill
          priority
          className="object-cover opacity-15"
        />
      </div>
      <div className="relative z-10">
        <h1 className="font-script leading-[1.3] text-5xl md:text-7xl lg:text-8xl bg-linear-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(232,165,25,0.5)]">
          Tracey Faye Abellon
        </h1>
        <h2 className="font-script leading-[1.3] text-4xl md:text-6xl lg:text-7xl bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent tracking-wide drop-shadow-[0_2px_8px_rgba(232,165,25,0.4)] mt-4">
          Victory Party
        </h2>
        <p className="mt-8 text-3xl md:text-2xl text-amber-100">
          December 21, 2025
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8 mt-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <p className="text-3xl md:text-5xl font-bold text-amber-400 mb-2">
                {value}
              </p>
              <p className="text-xs md:text-sm uppercase text-amber-100">
                {unit}
              </p>
            </div>
          ))}
        </div>

        {/* Menu Bar */}
        <nav className="mt-12 ">
          <ul className="flex flex-wrap justify-center gap-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  {item.icon}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
