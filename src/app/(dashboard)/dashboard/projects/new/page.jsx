"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers } from "@/actions";
import { useGlobal } from "@/components/GlobalContext";
import ProjectLoadingSkeleton from "@/components/ui/ProjectLoadingSkeleton";

const today = new Date().toISOString().split("T")[0];
const tomorrowObj = new Date();
tomorrowObj.setDate(tomorrowObj.getDate() + 1);
const tomorrow = tomorrowObj.toISOString().split("T")[0];

const NewProject = () => {
  const [users, setUsers] = useState([]);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { user } = useGlobal();

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    startDate: today,
    endDate: tomorrow,
    description: "",
    createdBy: user?.email,
  });

  const { title, type, startDate, endDate, description, createdBy } = formData;

  const router = useRouter();

  //submit form
  async function submitHandler(e) {
    e.preventDefault();

    if (
      title === "" ||
      type === "" ||
      startDate === "" ||
      endDate === "" ||
      description === "" ||
      !team.length
    )
      return;

    const projectData = { ...formData, members: team };

    setSubmitting(true);

    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.status !== 201) return;

      resetHandler(e);
      router.push("/dashboard/projects");
    } catch (error) {
      console.log(error);
    }
  }

  // reset form
  function resetHandler(e) {
    e.preventDefault();

    setFormData({
      title: "",
      type: "",
      startDate: today,
      endDate: tomorrow,
      description: "",
      createdBy: "",
    });

    setTeam([]);
    router.back();
  }

  //fetch users
  useEffect(() => {
    try {
      async function fetchUsers() {
        setLoading(true);

        const users = await getAllUsers();
        setUsers(users);
        setLoading(false);
      }

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //handle checked data
  function handleChecked(e) {
    const { value, checked } = e.target;

    if (checked) {
      setTeam((prev) => [...prev, value]);
    } else {
      setTeam((prev) => prev.filter((item) => item !== value));
    }
  }

  function onChangeHandler(e) {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const page = loading ? (
    <ProjectLoadingSkeleton />
  ) : (
    <form onSubmit={submitHandler} onReset={resetHandler}>
      {/* containing title, type and dates */}
      <div className="md:flex md:overflow-x-scroll md:overflow-y-hidden lg:overflow-hidden text-sm gap-2 w-full p-2">
        <div className="flex flex-col md:w-1/3">
          <label htmlFor="title" className="my-2 font-semibold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={onChangeHandler}
            className="border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="flex flex-col md:w-1/3">
          <label htmlFor="type" className="my-2 font-semibold">
            Type
          </label>
          <input
            type="text"
            name="type"
            id="type"
            value={type}
            onChange={onChangeHandler}
            className="border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            required
          />
        </div>

        <div className="flex gap-2 md:w-1/3">
          <div className="flex flex-col w-1/2">
            <label htmlFor="start" className="my-2 font-semibold">
              Start
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              min={today}
              value={startDate}
              onChange={onChangeHandler}
              className="border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label htmlFor="start" className="my-2 font-semibold">
              End
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              min={startDate}
              value={endDate}
              onChange={onChangeHandler}
              className="border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-2 text-sm">
        <label htmlFor="description" className="my-2 font-semibold">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="5"
          value={description}
          onChange={onChangeHandler}
          className="border rounded-lg p-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          required
        ></textarea>
        <div className="text-xs my-2">
          <span className="font-semibold text-purple-500">Created by: </span>
          {createdBy}
        </div>
      </div>

      <div className="md:flex w-full justify-between my-4 p-2 text-sm">
        <div>
          <span className="my-2 font-semibold">Members</span>
          <div className="flex gap-4">
            {users?.map((user) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                key={user._id}
              >
                <input
                  type="checkbox"
                  name="members"
                  id={user.name}
                  value={user.name}
                  checked={team.includes(user.name)}
                  onChange={handleChecked}
                />
                <label htmlFor={user.name}>{user.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="my-4 flex flex-col gap-4 md:flex-row">
          <button
            type="submit"
            className={`w-full text-white rounded-lg py-2 px-4 active:shadow-md ${submitting ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-600 cursor-pointer bg-blue-500"}`}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create"}
          </button>

          {submitting ? (
            ""
          ) : (
            <button
              type="reset"
              className="w-full text-blue-600 bg-blue-100 rounded-lg py-2 px-4 active:shadow-md hover:bg-blue-50 cursor-pointer"
              disabled={submitting}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );

  return (
    <div className="flex flex-col">
      <p className="text-lg text-gray-400 my-4">Projects / Create Project</p>

      <section className="flex flex-col w-full bg-white p-4 gap-4 shadow">
        {page}
      </section>
    </div>
  );
};

export default NewProject;
