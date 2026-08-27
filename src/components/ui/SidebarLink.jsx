import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const SidebarLink = ({ name, icon, href, active }) => {
  function itemIcon(icon) {
    switch (icon) {
      case "MdOutlineDashboard":
        return <MdOutlineDashboard />;
      case "FaProjectDiagram":
        return <FaProjectDiagram />;
      case "BiTask":
        return <BiTask />;
      case "IoMdSettings":
        return <IoMdSettings />;
    }
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 text-basex px-15 py-4 hover:bg-blue-100 ${active}`}
    >
      {itemIcon(icon)}
      {name}
    </Link>
  );
};

export default SidebarLink;
