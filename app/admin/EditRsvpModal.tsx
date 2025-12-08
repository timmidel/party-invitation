"use client";

import { useEffect, useState } from "react";

interface RSVP {
  id: string;
  attendance: string;
  guests: string | string[];
  created_at: string;
}

interface EditRsvpModalProps {
  rsvp: RSVP;
  onClose: () => void;
  onSave: (updatedRsvp: RSVP) => void;
  isSubmitting?: boolean;
}

export default function EditRsvpModal({
  rsvp,
  onClose,
  onSave,
  isSubmitting,
}: EditRsvpModalProps) {
  const [attendance, setAttendance] = useState(rsvp.attendance);
  const [guests, setGuests] = useState("");

  useEffect(() => {
    if (rsvp) {
      setAttendance(rsvp.attendance);
      const guestList = Array.isArray(rsvp.guests)
        ? rsvp.guests
        : JSON.parse(rsvp.guests as string);
      setGuests(guestList.join("\n"));
    }
  }, [rsvp]);

  const handleSave = () => {
    const guestList = guests.split("\n").filter((g) => g.trim() !== "");
    onSave({
      ...rsvp,
      attendance,
      guests: guestList,
    });
  };

  if (!rsvp) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a0f2e] border-2 border-amber-500/30 rounded-2xl p-8 w-full max-w-md text-amber-100">
        <h2 className="text-2xl font-script text-amber-400 mb-6">Edit RSVP</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-amber-200">
              Attendance
            </label>
            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              className="w-full px-4 py-2 bg-white/10 border-2 border-amber-500/30 rounded-xl text-amber-100 focus:outline-none focus:border-amber-500/60"
            >
              <option value="yes" className="bg-primary">
                Attending
              </option>
              <option value="no" className="bg-primary">
                Not Attending
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-amber-200">
              Guests (one per line)
            </label>
            <textarea
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 bg-white/10 border-2 border-amber-500/30 rounded-xl text-amber-100 placeholder-amber-100/40 focus:outline-none focus:border-amber-500/60"
              placeholder="Guest One&#10;Guest Two"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-xl font-semibold transition-all bg-white/5 text-amber-100 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-6 py-2 rounded-xl font-semibold transition-all bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
