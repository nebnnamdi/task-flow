"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { items } from "./SideBar";
import { MdOutlineDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const iconMap = {
  Dashboard: MdOutlineDashboard,
  Projects: FaProjectDiagram,
  Tasks: BiTask,
  Settings: IoMdSettings,
};

const MobileMenu = () => {
  const pathName = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(15,23,42,0.06)] backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around">
        {items.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathName === item.href
              : pathName === item.href || pathName.startsWith(`${item.href}/`);
          const Icon = iconMap[item.name];

          return (
            <Link
              href={item.href}
              key={item.name}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-blue-700"
                  : "text-slate-400 hover:text-slate-700"
              }`}
            >
              <span
                className={`rounded-lg p-1.5 ${isActive ? "bg-blue-50" : ""}`}
              >
                <Icon size={19} aria-hidden="true" />
              </span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileMenu;
