import { Album } from "../Album";
import { DraggableCardContainer } from "../ui/draggable-card";
import FadeUp from "../ui/fade_up";
import SectionHeading from "../ui/section_heading";
import { Spotlight } from "../ui/spotlight";

const Event = () => {
  return (
    <section id="event" className="bg-background/85">
      <DraggableCardContainer className="py-20 px-6 relative flex min-h-[1200px] sm:min-h-[1100px] w-full justify-center overflow-clip">
        <div className="max-w-6xl mx-auto text-center font-playfair">
          <FadeUp>
            <SectionHeading>The Event</SectionHeading>
          </FadeUp>

          {/* Why Celebrate Column */}
          <FadeUp delay={0.2}>
            <p className="text-lg sm:text-xl md:text-xl text-amber-100 leading-relaxed mb-8 text-center top-40">
              After years of dedication, hard work, and unwavering determination
              as a student,
              <span className="font-bold text-secondary">
                {" "}
                Tracey Faye Abellon{" "}
              </span>
              has achieved an incredible milestone worth celebrating—being a
              passer and the Top 3 of the Philippine Nurse Licensure Examination
              (PNLE).
            </p>

            <p className="text-lg sm:text-xl md:text-xl text-amber-100 leading-relaxed text-center mb-10">
              This victory party is a testament to perseverance, courage, and
              the power of believing in yourself, but most especially, in
              God&apos;s plans. Join us as we honor this remarkable achievement!
            </p>

            <div className="border-t border-amber-500/30 pt-5">
              <p className="text-3xl sm:text-4xl font-script text-secondary text-center">
                &quot;Believe that you can and you&apos;re halfway there.&quot;
              </p>
            </div>
          </FadeUp>
          {/* Album Column */}
          <Spotlight
            className="-top-40 left-0 md:-top-20 md:left-60"
            fill="#e8a519"
          />
          <Album />
        </div>
      </DraggableCardContainer>
    </section>
  );
};

export default Event;
