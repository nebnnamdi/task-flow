const TaskStatusBar = ({ tasks }) => {
  const all = tasks.length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const pending = tasks.filter((task) => task.status === "Pending").length;
  const completed = tasks.filter((task) => task.status === "Completed").length;

  return (
    <div>
      <div className="flex gap-1 md:gap-6 text-[9px] md:text-sm w-full justify-between md:justify-start md:w-2/3">
        <div className="flex gap-1 text-white bg-blue-500 rounded-2xl  items-center py-1 px-2 md:justify-between font-semibold md:px-5">
          <span>All tasks</span>
          <span className="rounded-2xl bg-blue-300 text-white px-1">{all}</span>
        </div>

        <div className="flex gap-1 text-blue-500 bg-gray-100 rounded-2xl justify-center items-center py-2 px-2 font-semibold md:px-5">
          In progress
          <span className="rounded-2xl bg-blue-200 text-blue-500 px-1">
            {inProgress}
          </span>
        </div>

        <div className="flex gap-1 text-yellow-400 bg-yellow-100 rounded-2xl justify-center items-center py-1 px-2 font-semibold md:px-5">
          Pending
          <span className="rounded-2xl bg-yellow-200 text-yellow-500 px-1">
            {pending}
          </span>
        </div>

        <div className="flex gap-1 text-green-500 bg-green-100 rounded-2xl justify-center items-center py-1 px-2 font-semibold md:px-5">
          Completed
          <span className="rounded-2xl bg-green-200 text-green-500 px-1">
            {completed}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskStatusBar;
