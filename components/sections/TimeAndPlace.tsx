import SectionHeading from "../ui/section_heading";
import GoldenButton from "../ui/golden_button";
import { Calendar, MapPin } from "lucide-react";
import FadeUp from "../ui/fade_up";

const TimeAndPlace = () => {
  const handleAddToCalendar = () => {
    const event = {
      text: "Tracey Faye Abellon Victory Party",
      dates: "20251221T170000/20251221T230000",
      details: "Join us for Tracey's Victory Party celebration!",
      location:
        "Grand Astoria Hotel, 466 Mayor Jaldon Street, Zamboanga City, Philippines",
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.text
    )}&dates=${event.dates}&details=${encodeURIComponent(
      event.details
    )}&location=${encodeURIComponent(event.location)}`;

    window.open(googleCalendarUrl, "_blank");
  };

  const handleOpenMaps = () => {
    const address =
      "Grand Astoria Hotel, 466 Mayor Jaldon Street, Zamboanga City, Philippines";
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    window.open(googleMapsUrl, "_blank");
  };

  return (
    <section
      id="time-place"
      className="py-20 px-6 bg-[#1d1035c2] font-playfair"
    >
      <div className="max-w-6xl mx-auto text-center">
        <FadeUp>
          <SectionHeading>Time & Place</SectionHeading>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
            {/* Time Column */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col">
              <div className="mb-6">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-2xl font-bold text-secondary mb-4">When</h3>
              </div>

              <div className="space-y-3 text-amber-100 grow">
                <p className="text-2xl font-bold text-amber-100">Sunday</p>
                <p className="text-4xl font-bold text-secondary">December 21</p>
                <p className="text-2xl mt-4 text-amber-100">5:00 PM onwards</p>
              </div>

              <GoldenButton
                className="mt-8 mx-auto"
                onClick={handleAddToCalendar}
              >
                <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Add to Calendar
              </GoldenButton>
            </div>

            {/* Place Column */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col">
              <div className="mb-6">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  Where
                </h3>
              </div>

              <div className="space-y-3 text-amber-100 flex-grow">
                <p className="text-2xl font-bold text-amber-100">
                  Grand Astoria Hotel
                </p>
                <p className="text-lg text-amber-100">Sapphire Hall</p>
                <p className="text-base text-amber-100 mt-4">
                  466 Mayor Jaldon Street
                </p>
                <p className="text-base text-amber-100">
                  Zamboanga City, Philippines
                </p>
              </div>

              <GoldenButton className="mt-8 mx-auto" onClick={handleOpenMaps}>
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Open in Maps
              </GoldenButton>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default TimeAndPlace;
