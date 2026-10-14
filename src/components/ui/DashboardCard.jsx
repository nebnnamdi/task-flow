import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { FiArrowUpRight } from "react-icons/fi";

const cardIcons = {
  FaProjectDiagram: FaProjectDiagram,
  BiTask,
  IoMdSettings,
};

const DashboardCard = ({ name, icon, href, description }) => {
  const Icon = cardIcons[icon];

  return (
    <Link
      href={href}
      className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
          <Icon size={21} aria-hidden="true" />
        </span>
        <span className="rounded-lg p-2 text-slate-300 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
          <FiArrowUpRight size={18} aria-hidden="true" />
        </span>
      </div>
      <div>
        <h2 className="text-base font-semibold text-slate-950">{name}</h2>
        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
