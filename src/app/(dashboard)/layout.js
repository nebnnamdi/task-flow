import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { dbConnect } from "@/lib/mongo";
import { GlobalProvider } from "@/components/GlobalContext";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";

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
      <body className="min-h-full flex flex-col">
        <div className="min-h-screen bg-white flex flex-col">
          {/* Header */}
          <Header />

          {/* Mobile menu */}
          <MobileMenu />

          {/* Layout wrapper */}
          <div className="flex pt-16 h-[calc(100vh)] box-border">
            <SideBar />

            <GlobalProvider>
              <main className="md:ml-[20%] md:w-4/5 w-full h-full overflow-y-auto bg-blue-100 p-4 pb-24">
                {children}
              </main>
            </GlobalProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
