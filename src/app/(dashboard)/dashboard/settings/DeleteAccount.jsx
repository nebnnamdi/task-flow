"use client";
import { useEffect, useState } from "react";
import { useGlobal } from "@/components/GlobalContext";
import {
  deleteUser,
  logout,
  getAllProjects,
  getAllTasks,
  deleteAllTasks,
  deleteAllProjects,
} from "@/actions";

import { FaRegTrashAlt } from "react-icons/fa";

const DeleteAccount = () => {
  const { user } = useGlobal();
  const [userProjects, setUserProjects] = useState([]);
  const [userTasks, setUserTasks] = useState([]);

  const email = user?.email;

  // Get all tasks and projects
  useEffect(() => {
    async function getAllData() {
      const allTasks = await getAllTasks();
      const allProjects = await getAllProjects();

      const projects = allProjects.filter(
        (project) => project.createdBy === email,
      );
      const tasks = allTasks.filter((task) => task.assignee === email);

      setUserProjects(projects);
      setUserTasks(tasks);
    }

    getAllData();
  }, [email]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );

    if (confirmed) {
      // Delete all created tasks and projects
      //   if (userProjects.length > 0 || userTasks.length > 0) {
      //     await deleteAllProjects(email);
      //     await deleteAllTasks(email);
      //   }

      const res = await deleteUser(email);
      if (res.acknowledged) {
        logout();
      }
    } else {
      console.log("Cancelled");
    }
  };

  return (
    <div className="bg-red-50 p-4 rounded-sm flex flex-col gap-2">
      {/* Account details */}
      <div className="flex gap-4 items-center mb-4">
        <span className="bg-red-100 p-2 rounded-md">
          <FaRegTrashAlt className="text-red-500" />
        </span>
        <span>
          <p className="text-sm font-semibold text-red-500">Danger Zone</p>
          <p className="text-xs text-gray-500">Manage your account security</p>
        </span>
      </div>

      <hr />

      <div className="md:ml-12">
        <span>
          <p className="font-semibold text-xs">Delete account</p>
        </span>

        <div className="text-xs flex items-center w-full">
          <div className="w-1/2">
            <p className="text-gray-500">
              Permanently delete your Task-Flow account and data
            </p>
          </div>

          <div className="w-1/2 text-right cursor-pointer">
            <span
              onClick={handleDeleteAccount}
              className="py-2 px-4 border border-red-200 rounded-sm font-semibold text-red-500 hover:border-0 hover:bg-red-500 hover:text-white cursor-pointer"
            >
              Delete account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
