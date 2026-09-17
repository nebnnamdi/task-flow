import { useEffect, useState } from "react";
import { getAllProjects, getAllUsers, getSession } from "@/actions";

const AllocationFields = ({ assignee, projectName, onChangeHandler }) => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getFeilds() {
      setIsLoading(true);

      const getProjects = await getAllProjects();
      const fetchedUsers = await getAllUsers();

      const session = await getSession();
      const sessionUser = session.user.email;

      const fetchedProjects = getProjects.filter(
        (project) => project.createdBy === sessionUser,
      );

      setUsers(fetchedUsers);
      setProjects(fetchedProjects);
      setIsLoading(false);
    }

    getFeilds();
  }, []);

  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col w-1/2 gap-2">
        <label htmlFor="assignee" className="font-semibold">
          Assignee <span className="text-red-500">*</span>
        </label>
        <select
          id="assignee"
          name="assignee"
          className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
          onChange={onChangeHandler}
          value={assignee}
          required
        >
          <option value="" disabled hidden>
            {isLoading ? "Please wait..." : "Please select"}
          </option>
          {users.map((user, index) => (
            <option key={index} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col w-1/2 gap-2">
        <label htmlFor="projectName" className="font-semibold">
          Project Name <span className="text-red-500">*</span>
        </label>
        <select
          id="projectName"
          name="projectName"
          onChange={onChangeHandler}
          value={projectName}
          required
          className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
        >
          <option value="" hidden disabled>
            {isLoading ? "Please wait..." : "Please select"}
          </option>
          {projects.map((project, index) => (
            <option key={index} value={project.title}>
              {project.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AllocationFields;
