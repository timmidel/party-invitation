import { useState } from "react";
import FadeUp from "../ui/fade_up";
import SectionHeading from "../ui/section_heading";
import GoldenButton from "../ui/golden_button";
import { Plus, X } from "lucide-react";
import { Toast, useToast } from "../Toast";

const Rsvp = () => {
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast, showToast, hideToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance, guests }),
      });

      const result = await response.json();

      if (result.success) {
        if (attendance === "yes")
          showToast("RSVP confirmed! See you at the party! 🎉", "success");
        else showToast("Got it. Maybe next time! ✨", "success");
        setGuests([""]);
      } else {
        showToast("Failed to save RSVP. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const addGuestField = () => {
    setGuests([...guests, ""]);
  };

  const removeGuestField = (index: number) => {
    if (guests.length > 1) {
      setGuests(guests.filter((_, i) => i !== index));
    }
  };

  const updateGuestName = (index: number, value: string) => {
    const newGuests = [...guests];
    newGuests[index] = value;
    setGuests(newGuests);
  };

  return (
    <>
      <Toast {...toast} onClose={hideToast} />
      <section
        id="rsvp"
        className="py-10 md:py-16 lg:py-20 px-4 md:px-6 bg-background/80"
      >
        <div className="max-w-4xl mx-auto text-center font-playfair">
          <FadeUp>
            <SectionHeading>RSVP</SectionHeading>
            <p className="text-sm md:text-base lg:text-lg text-amber-100 px-2">
              Let us know if you can join the celebration!
            </p>
            <p className="text-sm md:text-base lg:text-lg text-amber-100/80 mt-3 md:mt-4 mb-2 md:mb-4 lg:mb-8 px-2 italic">
              Note: Please RSVP for yourself and any other guests, even if you
              are not able to attend.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Attendance */}
              <div className="text-left">
                <label className="block text-secondary font-semibold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base lg:text-lg px-1">
                  Will you be attending? *
                </label>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3 lg:gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === "yes"}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="hidden peer"
                      disabled={isLoading}
                    />
                    <div className="no-confetti px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-4 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 text-center font-semibold transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:via-amber-500 peer-checked:to-yellow-600 peer-checked:text-primary peer-checked:border-amber-500 peer-checked:shadow-[0_0_20px_rgba(232,165,25,0.5)] text-xs md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                      ✓ Yes, I&apos;ll be there!
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === "no"}
                      onChange={(e) => setAttendance(e.target.value)}
                      className="hidden peer"
                      disabled={isLoading}
                    />
                    <div className="no-confetti px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-4 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 text-center font-semibold transition-all duration-300 peer-checked:bg-red-500/20 peer-checked:border-amber-500/60 text-xs md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                      ✗ Sorry, can&apos;t make it
                    </div>
                  </label>
                </div>
              </div>

              {/* Guest Names */}
              <div className="text-left">
                <label className="block text-secondary font-semibold mb-2 md:mb-3 lg:mb-4 text-sm md:text-base lg:text-lg px-1">
                  Guest Name/s *
                </label>
                <div className="space-y-2 md:space-y-3">
                  {guests.map((guest, index) => (
                    <div key={index} className="flex gap-2 md:gap-3">
                      <input
                        type="text"
                        value={guest}
                        onChange={(e) => updateGuestName(index, e.target.value)}
                        required
                        disabled={isLoading}
                        placeholder={`Guest ${index + 1} name`}
                        className="flex-1 px-3 py-2.5 md:px-4 md:py-3 lg:px-6 lg:py-4 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-sm md:text-base lg:text-lg backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {guests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGuestField(index)}
                          disabled={isLoading}
                          className="px-2.5 py-2.5 md:px-3 md:py-3 lg:px-4 lg:py-4 bg-red-500/20 border-2 border-red-500/40 rounded-xl md:rounded-2xl text-red-300 hover:bg-red-500/30 hover:border-red-500/60 transition-all duration-300 cursor-pointer flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addGuestField}
                  disabled={isLoading}
                  className="mt-3 md:mt-4 px-3 py-2 md:px-4 md:py-2.5 lg:px-6 lg:py-3 bg-white/10 border-2 border-amber-500/30 rounded-xl md:rounded-2xl text-amber-100 hover:bg-white/15 hover:border-amber-500/60 transition-all duration-300 flex items-center gap-2 mx-auto font-semibold cursor-pointer text-xs md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  Add Another Guest
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <GoldenButton
                  className="w-auto mx-auto"
                  isLoading={isLoading}
                  type="submit"
                >
                  Confirm RSVP
                </GoldenButton>
              </div>
            </form>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-xs md:text-sm text-amber-100/60 mt-2 md:mt-4 lg:mt-6 italic px-2">
              Please RSVP by December 15, 2025
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
};

export default Rsvp;
