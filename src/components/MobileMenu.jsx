"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { items } from "./SideBar";
import { MdOutlineDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const MobileMenu = () => {
  const pathName = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white shadow-lg pb-[env(safe-area-inset-bottom)] md:hidden">
      {items.map((item) => {
        const isActive = pathName === item.href;

        return (
          <Link
            href={item.href}
            key={item.name}
            className="flex flex-col items-center text-xs"
          >
            {item.name === "Dashboard" ? (
              <MdOutlineDashboard size={20} />
            ) : item.name === "Projects" ? (
              <FaProjectDiagram size={20} />
            ) : item.name === "Tasks" ? (
              <BiTask size={20} />
            ) : (
              <IoMdSettings size={20} />
            )}
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileMenu;
