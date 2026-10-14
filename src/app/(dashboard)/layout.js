import "../globals.css";

import { dbConnect } from "@/lib/mongo";
import { GlobalProvider } from "@/components/GlobalContext";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import MobileMenu from "@/components/MobileMenu";

export const metadata = {
  title: "Dashboard - Task-Flow",
  description: "Task-Flow dashboard",
};

export default async function dashboardLayout({ children }) {
  await dbConnect();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <MobileMenu />
      <SideBar />

      <GlobalProvider>
        <main className="min-h-screen pt-16 pb-20 md:ml-64 md:pb-8">
          <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </GlobalProvider>
    </div>
  );
}
