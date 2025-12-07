import { DraggableCardBody } from "@/components/ui/draggable-card";
import FadeUp from "./ui/fade_up";

export function Album() {
  const items = [
    {
      title: "Senior High Graduation",
      image: "images/portrait10.jpg",
      className: "absolute left-[33%] top-32 rotate-[3deg]",
    },
    {
      title: "Pin & Ring Ceremony",
      image: "images/portrait9.jpg",
      className: "absolute left-[48%] top-15 rotate-[3deg]",
    },
    {
      title: "Junior High Completion",
      image: "images/portrait8.jpg",
      className: "absolute left-[44%] top-12 rotate-[-2deg]",
    },
    {
      title: "Prep School Recognition Day",
      image: "images/portrait7.jpg",
      className: "absolute left-[36%] top-10 rotate-[-5deg]",
    },
    {
      title: "Prep School Graduation",
      image: "images/portrait6.jpg",
      className: "absolute top-18 left-[33%] rotate-[-8deg]",
    },
    {
      title: "Grade School Graduation",
      image: "images/portrait5.jpg",
      className: "absolute top-27 left-[45%] rotate-[8deg]",
    },
    {
      title: "AMDG Awards",
      image: "images/portrait4.jpg",
      className: "absolute top-15 left-[50%] rotate-[10deg]",
    },
    {
      title: "College Graduation",
      image: "images/portrait3.jpg",
      className: "absolute top-25 right-[40%] rotate-[2deg]",
    },
    {
      title: "Student Nurse",
      image: "images/portrait2.jpg",
      className: "absolute top-13 left-[46%] rotate-[-7deg]",
    },
    {
      title: "PNLE 2025 Passer and Top 3",
      image: "images/portrait1.jpg",
      className: "absolute top-11 left-[37%] rotate-[4deg]",
    },
  ];
  return (
    <>
      {items.map((item, index) => (
        <DraggableCardBody
          key={index}
          className={
            item.className +
            " no-confetti bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-4 rounded-lg shadow-[0_0_20px_rgba(232,165,25,0.4)] top-180 sm:top-140"
          }
        >
          <div>
            <img
              src={item.image}
              alt={item.title}
              className="pointer-events-none relative z-10 h-60 w-50 md:h-80 md:w-70 sm:w-70 sm:w-60 object-cover rounded"
            />
            <h3 className="mt-4 text-center text-md font-bold font-playfair text-primary">
              {item.title}
            </h3>
          </div>
        </DraggableCardBody>
      ))}
    </>
  );
}
