import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Great_Vibes,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracey Faye Abellon's Victory Party",
  description:
    "You're Invited to the Victory Party of Tracey Faye Abellon! Join us for a night of celebration, fun, and unforgettable memories as we honor Tracey's achievements. Save the date and RSVP now!",
  openGraph: {
    title: "Tracey Faye Abellon's Victory Party",
    description: "A special celebration honoring Tracey Faye Abellon, RN.",
    url: "https://tracey-invitation.vercel.app/",
    siteName: "Tracey Faye Abellon's Victory Party",
    images: [
      {
        url: "https://tracey-invitation.vercel.app/images/elegant_purple_bg.jpg",
        width: 1200,
        height: 630,
        alt: "Tracey Invitation Cover",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tracey Faye Abellon's Victory Party",
    description: "A special celebration honoring Tracey Faye Abellon, RN.",
    images: [
      "https://tracey-invitation.vercel.app/images/elegant_purple_bg.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
