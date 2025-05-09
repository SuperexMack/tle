import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next Contest Tracker",
  description: "Check out the next date of the contest and save your time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
