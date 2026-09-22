import Link from "next/link";

import { getProject, deleteProject } from "@/actions";
import DeleteButton from "./DeleteButton";
import { FaBriefcase } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";

const ProjectDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await getProject(id);

  console.log(res);

  // const baseUrl = process.env.VERCEL_URL
  //   ? `https://${process.env.VERCEL_URL}`
  //   : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  // const response = await fetch(`${baseUrl}/api/project/${id}`);

  if (!res) throw new Error("Failed to fetch data");

  // const data = await response.json();

  return (
    <div className="flex flex-col">
      <Link
        href="/dashboard/projects"
        className="cursor-pointer text-xs my-4 text-blue-400 hover:underline w-30"
      >
        &laquo; Back to Projects
      </Link>

      <div className="flex justify-between mb-4">
        <div>
          <p className="text-2xl font-bold">{res.title}</p>
        </div>

        <div className="flex gap-4">
          <DeleteButton projectId={id} action={deleteProject} />
        </div>
      </div>

      <section className="flex flex-col w-full gap-3">
        {/* topmost section of project details */}
        <div className="flex flex-col lg:flex-row bg-white justify-between p-4 shadow rounded-lg">
          {/* project type */}
          <div className="flex gap-4 border-b-2 border-gray-100 md:border-0 pb-2 mb:pt-0 md:b-0 md:py-0">
            <div className="flex justify-center items-center p-4 bg-purple-100 rounded-md">
              <FaBriefcase className="text-purple-600" />
            </div>

            <div className="flex flex-col justify-center text-xs gap-1">
              <p>Project Type</p>
              <p className="font-semibold">{res.type}</p>
            </div>
          </div>

          {/* start date */}
          <div className="flex gap-4 border-b-2 border-gray-100 md:border-0 py-2 md:b-0 md:py-0">
            <div className="flex justify-center items-center p-4 bg-green-100 rounded-md">
              <FaRegCalendarAlt className="text-green-600" />
            </div>

            <div className="flex flex-col justify-center text-xs gap-1">
              <p>Start Date</p>
              <p className="font-semibold">{res.startDate}</p>
            </div>
          </div>

          {/* end date */}
          <div className="flex gap-4 border-b-2 border-gray-100 md:border-0 py-2 md:b-0 md:py-0">
            <div className="flex justify-center items-center p-4 bg-orange-100 rounded-md">
              <FaRegCalendarAlt className="text-orange-600" />
            </div>

            <div className="flex flex-col justify-center text-xs gap-1">
              <p>End Date</p>
              <p className="font-semibold">{res.endDate}</p>
            </div>
          </div>

          {/* created by */}
          <div className="flex gap-4 pt-2 md:pt-0">
            <div className="flex justify-center items-center p-4 bg-blue-100 rounded-md">
              <FaUser className="text-blue-600" />
            </div>

            <div className="flex flex-col justify-center text-xs gap-1">
              <p>Created By</p>
              <p className="font-semibold">{res.createdBy}</p>
            </div>
          </div>
        </div>

        {/* other section of project details */}
        <div className="flex flex-col md:flex-row gap-3 w-full h-full lg:my-3 text-sm">
          {/* description & details */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* description */}
            <div className="flex flex-col gap-2 min-h-50 bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">Description</p>
              <p>{res.description}</p>
            </div>

            {/* details */}
            <div className="bg-white p-4 rounded-lg shadow min-h-50 flex flex-col  gap-2">
              <p className="font-semibold">Project Details</p>
              <table className="w-full text-left border-collapse">
                <tbody className="divide-y divide-gray-200 [&_td]:py-1.5">
                  <tr>
                    <td>Title</td>
                    <td>{res.title}</td>
                  </tr>

                  <tr>
                    <td>Type</td>
                    <td>{res.type}</td>
                  </tr>

                  <tr>
                    <td>Start Date</td>
                    <td>{res.startDate}</td>
                  </tr>

                  <tr>
                    <td>End Date</td>
                    <td>{res.endDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* creator and members */}
          <div className="lg:w-1/2 flex flex-col gap-3">
            {/* creator */}
            <div className="flex flex-col gap-4 h-1/3 bg-white p-4 rounded-lg shadow">
              <p className="font-semibold">Project Creator</p>
              <div className="flex gap-4">
                <FaUser className="rounded-full bg-blue-100 text-blue-700 size-14 p-2" />
                <div className="flex flex-col justify-center">
                  <p className="font-semibold">{res.createdBy}</p>
                </div>
              </div>
            </div>

            {/* members */}
            <div className="flex flex-col h-2/3 w-full bg-white p-4 rounded-lg shadow gap-4">
              <p className="font-semibold">Project Members</p>

              {/* each member */}
              <div className="flex flex-col gap-2">
                {res.members.map((member) => (
                  <div
                    key={member}
                    className="flex gap-2 border-b border-gray-200 last:border-b-0"
                  >
                    <FaUser className="rounded-full bg-blue-100 text-blue-700 size-8 p-2" />
                    <div className="text-xs">
                      <p className="font-semibold">{member}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
