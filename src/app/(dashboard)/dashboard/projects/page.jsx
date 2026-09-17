"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/actions";
import { useGlobal } from "@/components/GlobalContext";
import TableSkeleton from "@/components/ui/TableSkeleton";

const ProjectPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const session = useGlobal();
  const sessionEmail = session?.user?.email;

  useEffect(() => {
    async function fetchProjects() {
      setIsLoading(true);

      try {
        const projects = await getAllProjects();

        const userProjects = projects.filter(
          (project) => project.createdBy === sessionEmail,
        );

        setProjects(userProjects);
        setIsLoading(false);
      } catch (error) {
        console.error({ error });
      }
    }

    fetchProjects();
  }, [sessionEmail]);

  const page = isLoading ? (
    <div className="flex flex-col pb-24">
      <p className="text-2xl font-bold mb-4">Projects</p>

      <section className="flex flex-col w-full bg-white p-4 gap-4 min-h-50">
        <div>
          <Link
            href="/dashboard/projects/new"
            className="text-sm bg-purple-100 rounded-2xl py-2 px-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:bg-purple-200"
          >
            Create project
          </Link>
        </div>

        <div>
          <TableSkeleton />
        </div>
      </section>
    </div>
  ) : (
    <div className="flex flex-col">
      <Link
        href="/dashboard"
        className="cursor-pointer text-xs my-4 text-blue-400 hover:underline w-30"
      >
        &laquo; Back to Dashboard
      </Link>

      <p className="text-2xl font-bold mb-4">Projects</p>

      <section className="flex flex-col w-full h-screen bg-white p-4 gap-4">
        <div>
          <Link
            href="/dashboard/projects/new"
            className="text-sm bg-purple-100 rounded-2xl py-2 px-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:bg-purple-200"
          >
            Create project
          </Link>
        </div>

        <div className="overflow-x-auto">
          {!projects.length && (
            <p className="text-center font-semibold text-2xl">
              No projects found
            </p>
          )}
          {projects.length > 0 && (
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead className="bg-gray-50 [&_th]:p-4">
                <tr className="border-b border-gray-300 ">
                  <th>Title</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 [&_td]:p-4 [&_tr]:hover:bg-gray-50">
                {projects.map((i) => (
                  <tr key={i._id}>
                    <td>{i.title}</td>
                    <td>{i.type}</td>
                    <td>{i.startDate}</td>
                    <td>{i.endDate}</td>
                    <td>
                      <Link
                        href={`/dashboard/projects/${i._id}`}
                        className="hover:underline text-blue-500"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );

  return page;
};

export default ProjectPage;
