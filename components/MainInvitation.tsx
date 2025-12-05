import Image from "next/image";
export default function MainInvitation() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <Image
        src="/images/elegant_purple_bg.jpg"
        alt="Background"
        fill
        priority
        className="object-cover opacity-5"
      />
    </div>
  );
}
