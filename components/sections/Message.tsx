import { useState } from "react";
import FadeUp from "../ui/fade_up";
import SectionHeading from "../ui/section_heading";
import GoldenButton from "../ui/golden_button";
import { Send, Heart } from "lucide-react";

const Message = () => {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Message sent:", formData);
    // Reset form
    setFormData({ name: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="message"
      className="py-20 px-6 bg-[#1a0f2ec7]/85 font-playfair"
    >
      <div className="max-w-4xl mx-auto text-center">
        <FadeUp>
          <SectionHeading>Send a Message</SectionHeading>
          <p className="text-lg text-amber-100 mt-4 mb-12">
            Share your congratulations and warm wishes with Tracey
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="text-left">
              <label
                htmlFor="name"
                className="block text-secondary font-semibold mb-2 text-lg"
              >
                Your Name/Codename
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name/codename"
                className="w-full px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>

            {/* Message Textarea */}
            <div className="text-left">
              <label
                htmlFor="message"
                className="block text-secondary font-semibold mb-2 text-lg"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Write your heartfelt message here..."
                className="w-full px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg resize-none backdrop-blur-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <GoldenButton className="mx-auto">
                <Send className="w-5 h-5 text-primary" />
                Send Message
              </GoldenButton>
            </div>
          </form>
        </FadeUp>
      </div>
    </section>
  );
};

export default Message;
