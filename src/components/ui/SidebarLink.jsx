import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const icons = {
  MdOutlineDashboard,
  FaProjectDiagram,
  BiTask,
  IoMdSettings,
};

const SidebarLink = ({ name, icon, href, active }) => {
  const Icon = icons[icon];

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-blue-50 text-blue-700 shadow-sm"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
          active
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
        }`}
      >
        <Icon size={18} aria-hidden="true" />
      </span>
      <span>{name}</span>
    </Link>
  );
};

export default SidebarLink;
