import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { dbConnect } from "@/lib/mongo";
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";

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

          {/* Layout wrapper */}
          <div className="flex pt-16 h-[calc(100vh)] box-border">
            <SideBar />

            <main className="md:ml-[20%] md:w-4/5 w-full h-[calc(100vh-4rem)] overflow-y-auto bg-blue-100 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

// {/* Header */}
//         <header className="flex flex-row justify-between p-2 w-full shadow fixed top-0 z-50 bg-white">

//           </form>
//         </header>

//         <div className="md:flex md:flex-row h-screen overflow-hidden bg-blue-100">
//           {/* Sidebar
//           <aside className="md:flex min-h-screen w-1/5 md:fixed top-14 bg-white shadow-[5px_0_15px_-3px_rgba(0,0,0,0.1)]"></aside>

//           <main className="w-2/5"> {children}</main> */}

//           <aside className="md:w-1/5 bg-black hidden md:flex md:flex-col text-white pt-15">
//             <a className="text-white">THis</a>
//           </aside>

//           <main className="md:w-4/5 bg-red-500 h-full overflow-y-auto">
//             {children}
//           </main>
//         </div>
