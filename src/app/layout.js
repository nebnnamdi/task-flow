import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
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
  title: "Task-Flow",
  description: "Manage your daily tasks and workflows seamlessly.",
};

export default async function RootLayout({ children }) {
  await dbConnect();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
