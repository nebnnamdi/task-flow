import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { dbConnect } from "@/lib/mongo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dashboard - Task-Flow",
  description: "Task-Flow dashboard",
};

export default async function dashboardLayout({ children }) {
  await dbConnect();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
