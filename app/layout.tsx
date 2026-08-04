import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yoga Setyawan — Portfolio",
  description:
    "Personal portfolio of Yoga Setyawan — showcasing projects, experience, and technical skills in software engineering and robotics.",
  keywords: [
    "Yoga Setyawan",
    "portfolio",
    "software engineer",
    "web developer",
    "robotics",
  ],
  authors: [{ name: "Yoga Setyawan" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
