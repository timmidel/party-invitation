import { useState } from "react";
import FadeUp from "../ui/fade_up";
import SectionHeading from "../ui/section_heading";
import GoldenButton from "../ui/golden_button";
import { Send } from "lucide-react";
import { Toast, useToast } from "../Toast";

const Message = () => {
  const { toast, showToast, hideToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        showToast("Message sent successfully! ✨", "success");
        setFormData({ name: "", message: "" });
      } else {
        showToast("Failed to send message. Please try again.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
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
    <>
      <Toast {...toast} onClose={hideToast} />
      <section
        id="message"
        className="py-12 md:py-16 lg:py-20 px-4 md:px-6 bg-[#1a0f2ec7]/85 font-playfair relative"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden filter">
          <div
            className="absolute top-0 left-0 w-48 h-48 md:w-72 md:h-72 bg-indigo-400 rounded-full"
            style={{
              filter: "blur(60px)",
              WebkitFilter: "blur(60px)",
            }}
          ></div>

          <div
            className="absolute bottom-0 right-0 w-48 h-48 md:w-72 md:h-72 bg-orange-500 rounded-full"
            style={{
              filter: "blur(70px)",
              WebkitFilter: "blur(70px)",
            }}
          ></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeUp>
            <SectionHeading>Send a Message</SectionHeading>
            <p className="text-base md:text-lg text-amber-100 mt-3 md:mt-4 mb-4 md:mb-6 px-2">
              Share your congratulations and warm wishes with Tracey
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Name Input */}
              <div className="text-left">
                <label
                  htmlFor="name"
                  className="block text-secondary font-semibold mb-2 text-base md:text-lg px-1"
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
                  disabled={isLoading}
                  placeholder="Enter your name/codename"
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-base md:text-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Message Textarea */}
              <div className="text-left">
                <label
                  htmlFor="message"
                  className="block text-secondary font-semibold mb-2 text-base md:text-lg px-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  disabled={isLoading}
                  placeholder="Write your heartfelt message here..."
                  className="w-full px-4 py-3 md:px-6 md:py-4 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-base md:text-lg resize-none backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px] md:min-h-[150px]"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <GoldenButton
                  className="w-auto mx-auto"
                  isLoading={isLoading}
                  type="submit"
                >
                  <Send className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Send Message
                </GoldenButton>
              </div>
            </form>
          </FadeUp>
        </div>
      </section>
    </>
  );
};

export default Message;
