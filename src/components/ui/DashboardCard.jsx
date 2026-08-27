import Link from "next/link";
import { FaProjectDiagram } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";

const DashboardCard = ({ name, icon, href, others }) => {
  return (
    <Link
      href={href}
      className="flex flex-col gap-4 justify-center items-center bg-white w-full md:w-1/3 shadow-lg border rounded-2xl py-4 border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 active:shadow-md cursor-pointer"
    >
      <div className="">
        {icon === "FaProjectDiagram" ? (
          <FaProjectDiagram size={50} />
        ) : icon === "BiTask" ? (
          <BiTask size={50} />
        ) : (
          <IoMdSettings size={50} />
        )}
      </div>

      <div className="r">
        <p className="text-base font-bold pb-4">{name}</p>
      </div>
    </Link>
  );
};

export default DashboardCard;
