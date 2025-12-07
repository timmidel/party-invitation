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
      // Handle error
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
        className="py-20 px-6 bg-[#1a0f2ec7]/85 font-playfair relative"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-13">
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-400 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500 rounded-full blur-[110px]"></div>
        </div>
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
                  disabled={isLoading}
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
                  disabled={isLoading}
                  placeholder="Write your heartfelt message here..."
                  className="w-full px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg resize-none backdrop-blur-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <GoldenButton
                  className="mx-auto"
                  isLoading={isLoading}
                  type="submit"
                >
                  <Send className="w-5 h-5 text-primary" />
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
