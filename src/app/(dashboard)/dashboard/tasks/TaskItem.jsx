import { useState } from "react";
import { updateTaskStatus } from "@/actions";

import { FaBriefcase } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import ActionDropdown from "@/components/ui/ActionDropdown";

const TaskItem = ({
  title: taskTitle,
  priority,
  projectName: projectTitle,
  description,
  dueDate,
  status,
  _id: id,
  onTaskUpdate,
}) => {
  const [newStatus, setNewStatus] = useState(status);

  const updateStatusHandler = async (data, id) => {
    const oldStatus = status;

    setNewStatus(data);
    const response = await updateTaskStatus(id, data);

    if (!response.success) {
      setNewStatus(oldStatus);
    }

    onTaskUpdate(response.data);
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-4 rounded-2xl">
      <div className="flex justify-between text-xs items-center">
        <p className="font-semibold">{taskTitle}</p>
        <div className="flex items-center gap-2">
          <span
            className={`font-semibold px-5 py-1 rounded-2xl ${priority === "High" ? "bg-red-50 text-red-500" : priority === "Low" ? "bg-green-50 text-green-500" : "bg-yellow-50 text-yellow-500"}`}
          >
            {priority}
          </span>
          <span>
            <ActionDropdown id={id} updateStatus={updateStatusHandler} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500">
        <FaBriefcase className="text-purple-700 bg-purple-100" />
        <p>{projectTitle}</p>
      </div>

      <span className="text-xs text-gray-500">{description}</span>

      <div className="flex justify-between text-xs ">
        <span className="flex items-center gap-2 text-gray-500 font-semibold">
          <MdDateRange /> Due {dueDate}
        </span>
        <span
          className={`font-semibold px-5 py-1 rounded-2xl ${newStatus === "In Progress" ? "bg-blue-50 text-blue-500" : newStatus === "Pending" ? "bg-yellow-50 text-yellow-500" : "bg-green-50 text-green-500"}`}
        >
          {newStatus}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
