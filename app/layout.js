/** @format */

import localFont from "next/font/local";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Keells",
  description: "Keells Quiz",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden relative`}>
          {/* Background Video */}
          <video
            src="/background_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 w-screen h-screen object-cover transform -translate-x-1/2 -translate-y-1/2 z-[-1]"
          />

          {/* Content */}
          <div className="relative z-10">{children}</div>
        </body>
      </html>
    </ViewTransitions>
  );
}
