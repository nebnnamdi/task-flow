"use client";

import SidebarLink from "@/components/ui/SidebarLink";
import { usePathname } from "next/navigation";

export const items = [
  { name: "Dashboard", icon: "MdOutlineDashboard", href: "/dashboard" },
  { name: "Projects", icon: "FaProjectDiagram", href: "/dashboard/projects" },
  { name: "Tasks", icon: "BiTask", href: "/dashboard/tasks" },
  { name: "Settings", icon: "IoMdSettings", href: "/dashboard/settings" },
];

const SideBar = () => {
  const pathName = usePathname();

  return (
    <aside className="fixed left-0 hidden md:flex md:flex-col md:w-1/5 h-screen bg-white shadow  overflow-y-auto ">
      <nav className="flex flex-col space-y-2">
        {items.map((item) => {
          const isActive = pathName === item.href;

          return (
            <SidebarLink
              name={item.name}
              icon={item.icon}
              href={item.href}
              key={item.name}
              active={`${isActive ? "bg-blue-100" : ""}`}
            />
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
