import { Heart, Mail, MapPin, Calendar, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0a1a] py-12 px-6 border-t border-amber-500/20 font-playfair">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-script text-amber-300 mb-4">
              Tracey&apos;s Victory Party
            </h3>
            <p className="text-amber-100/70 text-sm leading-relaxed">
              Join us in celebrating an incredible milestone and achievement.
              Your presence would make this celebration even more special.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-amber-200 mb-4">
              Quick Links
            </h4>
            <nav className="space-y-2">
              <a
                href="#hero"
                className="block text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                Home
              </a>
              <a
                href="#time-place"
                className="block text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                Time & Place
              </a>
              <a
                href="#event"
                className="block text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                The Event
              </a>
              <a
                href="#message"
                className="block text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                Send Message
              </a>
              <a
                href="#rsvp"
                className="block text-amber-100/70 hover:text-amber-300 transition-colors"
              >
                RSVP
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-amber-200 mb-4">
              Event Details
            </h4>
            <div className="space-y-3 text-amber-100/70 text-sm">
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>December 21, 2025</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Zamboanga City</span>
              </div>
              <div className="flex items-center justify-center md:justify-end gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <a
                  href="tel:+639773324161"
                  className="hover:text-amber-300 transition-colors"
                >
                  +63 977 332 4161
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-amber-500/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-amber-100/60 text-sm text-center md:text-left">
              © 2025 Tracey Faye Abellon Victory Party. All rights reserved.
            </p>

            {/* Made with Love */}
            <p className="text-amber-100/60 text-sm flex items-center gap-2">
              Made with{" "}
              <Heart className="w-4 h-4 text-amber-400 fill-amber-400" /> for
              Tracey
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
