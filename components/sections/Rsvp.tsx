import { useState } from "react";
import FadeUp from "../ui/fade_up";
import SectionHeading from "../ui/section_heading";
import GoldenButton from "../ui/golden_button";
import { Check, Plus, X } from "lucide-react";

const Rsvp = () => {
  const [attendance, setAttendance] = useState("yes");
  const [guests, setGuests] = useState([""]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("RSVP submitted:", { attendance, guests });
    // Reset form or show success message
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
    <section id="rsvp" className="py-20 px-6 bg-background/80">
      <div className="max-w-4xl mx-auto text-center font-playfair">
        <FadeUp>
          <SectionHeading>RSVP</SectionHeading>
          <p className="text-lg text-amber-100/80 mt-4 mb-12">
            Let us know if you can join the celebration!
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Attendance */}
            <div className="text-left">
              <label className="block text-amber-200 font-semibold mb-4 text-lg">
                Will you be attending? *
              </label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="attendance"
                    value="yes"
                    checked={attendance === "yes"}
                    onChange={(e) => setAttendance(e.target.value)}
                    className="hidden peer"
                  />
                  <div className="px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 text-center font-semibold transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-yellow-400 peer-checked:via-amber-500 peer-checked:to-yellow-600 peer-checked:text-primary peer-checked:border-amber-500 peer-checked:shadow-[0_0_20px_rgba(232,165,25,0.5)]">
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
                  />
                  <div className="px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 text-center font-semibold transition-all duration-300 peer-checked:bg-white/20 peer-checked:border-amber-500/60">
                    ✗ Sorry, can&apos;t make it
                  </div>
                </label>
              </div>
            </div>

            {/* Guest Names (only show if attending) */}
            {attendance === "yes" && (
              <div className="text-left">
                <label className="block text-amber-200 font-semibold mb-4 text-lg">
                  Guest Names *
                </label>
                <div className="space-y-3">
                  {guests.map((guest, index) => (
                    <div key={index} className="flex gap-3">
                      <input
                        type="text"
                        value={guest}
                        onChange={(e) => updateGuestName(index, e.target.value)}
                        required
                        placeholder={`Guest ${index + 1} name`}
                        className="flex-1 px-6 py-4 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60 focus:bg-white/15 transition-all duration-300 text-lg backdrop-blur-sm"
                      />
                      {guests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeGuestField(index)}
                          className="px-4 py-4 bg-red-500/20 border-2 border-red-500/40 rounded-2xl text-red-300 hover:bg-red-500/30 hover:border-red-500/60 transition-all duration-300 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addGuestField}
                  className="mt-4 px-6 py-3 bg-white/10 border-2 border-amber-500/30 rounded-2xl text-amber-200 hover:bg-white/15 hover:border-amber-500/60 transition-all duration-300 flex items-center gap-2 mx-auto font-semibold cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Guest
                </button>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <GoldenButton className="mx-auto">Confirm RSVP</GoldenButton>
            </div>
          </form>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="text-sm text-amber-100/60 mt-8 italic">
            Please RSVP by December 15, 2025
          </p>
        </FadeUp>
      </div>
    </section>
  );
};

export default Rsvp;
