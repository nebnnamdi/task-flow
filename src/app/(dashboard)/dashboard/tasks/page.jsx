"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import TaskItem from "./TaskItem";
import TaskStatusBar from "./TaskStatus";
import { getAllTasks, getSession } from "@/actions";
import Spinner from "@/components/ui/Spinner";

// const tasks = [
//   {
//     id: "1",
//     taskTitle: "Task 1",
//     priority: "High",
//     projectTitle: "First project",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda earum maxime ut ipsam ad totam, sunt aspernatur modi laudantium placeat libero culpa amet provident. Possimus tenetur quos nam beatae?",
//     status: "In Progress",
//     dueDate: "2023-08-01",
//   },
//   {
//     id: "2",
//     taskTitle: "Task 2",
//     priority: "Low",
//     projectTitle: "Second project",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda earum maxime ut ipsam ad totam, sunt aspernatur modi laudantium placeat libero culpa amet provident. Possimus tenetur quos nam beatae?",
//     status: "Pending",
//     dueDate: "2023-08-01",
//   },
//   {
//     id: "3",
//     taskTitle: "Task 3",
//     priority: "Medium",
//     projectTitle: "Third project",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda earum maxime ut ipsam ad totam, sunt aspernatur modi laudantium placeat libero culpa amet provident. Possimus tenetur quos nam beatae?",
//     status: "Completed",
//     dueDate: "2023-08-01",
//   },
//   {
//     id: "4",
//     taskTitle: "Task 4",
//     priority: "Low",
//     projectTitle: "Fourth project",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit assumenda earum maxime ut ipsam ad totam, sunt aspernatur modi laudantium placeat libero culpa amet provident. Possimus tenetur quos nam beatae?",
//     status: "Pending",
//     dueDate: "2023-08-01",
//   },
// ];

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getTasks() {
      const session = await getSession();
      const userEmail = session.user.email;

      const allTasks = await getAllTasks();
      const filteredTasks = allTasks.filter(
        (task) => task.assignee === userEmail,
      );

      setTasks(filteredTasks);
      setIsLoading(false);
    }

    getTasks();
  }, []);

  //update task array after task status has been updates
  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task._id === updatedTask._id ? updatedTask : task,
      ),
    );
  };

  const page = isLoading ? (
    <Spinner />
  ) : (
    <div className="flex flex-col">
      {/* Back to dashboard button */}
      <Link
        href="/dashboard"
        className="cursor-pointer text-xs my-4 text-blue-400 hover:underline w-30"
      >
        &laquo; Back to Dashboard
      </Link>

      <p className="text-2xl font-bold mb-4">Tasks</p>

      <section className="flex flex-col w-full h-screen p-4 gap-4">
        {/* Create task button */}
        <div>
          <Link
            href="/dashboard/tasks/new"
            className="text-sm bg-purple-500 text-white rounded-2xl py-2 px-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl active:translate-y-0 active:shadow-md hover:bg-purple-200"
          >
            Create task
          </Link>
        </div>

        {/* Task status */}
        <TaskStatusBar tasks={tasks} />

        {/* Task list */}
        <div className="flex flex-col gap-2 mb-5">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                onTaskUpdate={handleTaskUpdate}
                key={task._id}
                {...task}
              />
            ))
          ) : (
            <p className="font-semibold text-2xl">No tasks found</p>
          )}
        </div>
      </section>
    </div>
  );
  return page;
};

export default TasksPage;
