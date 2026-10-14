"use client";

import Link from "next/link";
import SidebarLink from "@/components/ui/SidebarLink";
import { usePathname } from "next/navigation";
import { FiChevronRight } from "react-icons/fi";

export const items = [
  { name: "Dashboard", icon: "MdOutlineDashboard", href: "/dashboard" },
  { name: "Projects", icon: "FaProjectDiagram", href: "/dashboard/projects" },
  { name: "Tasks", icon: "BiTask", href: "/dashboard/tasks" },
  { name: "Settings", icon: "IoMdSettings", href: "/dashboard/settings" },
];

const SideBar = () => {
  const pathName = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 z-40 hidden w-64 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Workspace
        </p>
        <nav className="space-y-1" aria-label="Main navigation">
          {items.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathName === item.href
                : pathName === item.href ||
                  pathName.startsWith(`${item.href}/`);

            return (
              <SidebarLink
                name={item.name}
                icon={item.icon}
                href={item.href}
                key={item.name}
                active={isActive}
              />
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-100 p-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3 text-xs text-slate-500 transition-colors hover:bg-slate-100"
        >
          <span>Account settings</span>
          <FiChevronRight size={15} />
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
