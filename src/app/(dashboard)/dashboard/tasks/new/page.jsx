"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import AllocationFields from "./AllocationFields";

const today = new Date().toISOString().split("T")[0];

const NewTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: today,
    dueDate: "",
    priority: "",
    status: "",
    assignee: "",
    projectName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    description,
    startDate,
    dueDate,
    priority,
    status,
    assignee,
    projectName,
  } = formData;

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await fetch("/api/createtask/", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 201) {
        resetHandler(e);
        router.push("/dashboard/tasks");

        setIsLoading(false);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log({ error });
    }
  }

  function resetHandler(e) {
    e.preventDefault();

    setIsLoading(true);

    setFormData({
      title: "",
      description: "",
      startDate: today,
      dueDate: "",
      priority: "",
      status: "",
      assignee: "",
      projectName: "",
    });

    setIsLoading(false);

    router.back();
  }

  function onChangeHandler(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="flex flex-col">
      <p className="text-lg text-gray-400 my-4">Tasks / Create Task</p>
      <section className="flex flex-col w-full bg-white p-4 gap-4 shadow">
        <form
          onSubmit={submitHandler}
          onReset={resetHandler}
          className="text-sm flex flex-col gap-4"
        >
          {/* Task title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={onChangeHandler}
              placeholder="Task Title"
              className="bg-gray-50 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              placeholder="Description"
              rows="4"
              value={description}
              onChange={onChangeHandler}
              className="bg-gray-50 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            ></textarea>
          </div>

          {/* Start and due dates */}
          <div className="w-full flex gap-4">
            <div className="w-1/2 flex flex-col">
              <label htmlFor="startDate" className="font-semibold">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                min={today}
                onChange={onChangeHandler}
                className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
                required
              />
            </div>

            <div className="w-1/2 flex flex-col">
              <label htmlFor="dueDate" className="font-semibold">
                Due Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dueDate"
                id="dueDate"
                value={dueDate}
                min={startDate}
                onChange={onChangeHandler}
                required
                className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
              />
            </div>
          </div>

          {/* Priority and status */}
          <div className="w-full flex gap-4">
            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="priority" className="font-semibold">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                id="priority"
                name="priority"
                onChange={onChangeHandler}
                value={priority}
                required
                className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
              >
                <option value="" disabled hidden>
                  Please select
                </option>

                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex flex-col w-1/2 gap-2">
              <label htmlFor="status" className="font-semibold">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                id="status"
                name="status"
                className="bg-gray-50 px-4 py-2 rounded-xl focus:ring-2 focus:ring-blue-300 outline-none"
                onChange={onChangeHandler}
                value={status}
                required
              >
                <option value="" disabled hidden>
                  Please select
                </option>

                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Assignee and project name */}
          <AllocationFields
            assignee={assignee}
            projectName={projectName}
            onChangeHandler={onChangeHandler}
          />

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-end gap-4">
            <button
              type="submit"
              className={`text-white rounded-lg py-2 px-4 active:shadow-md ${isLoading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-600 cursor-pointer bg-blue-500"}`}
              disabled={isLoading}
            >
              {isLoading ? "Creating task..." : "Create Task"}
            </button>

            {!isLoading && (
              <button
                type="reset"
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewTask;
