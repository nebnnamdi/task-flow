import { auth } from "@/auth";
import DashboardCard from "@/components/ui/DashboardCard";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const items = [
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: "FaProjectDiagram",
    description: "Create, organize and keep track of your projects.",
  },
  {
    name: "Tasks",
    href: "/dashboard/tasks",
    icon: "BiTask",
    description: "Manage assigned work and keep tasks moving forward.",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: "IoMdSettings",
    description: "Update your profile, password and account preferences.",
  },
];

const Dashboard = async () => {
  const session = await auth();
  const name =
    session?.user?.name || session?.user?.email?.split("@")[0] || "there";

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Workspace overview
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Welcome back, {name}.
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Keep your projects organized, stay on top of assigned tasks, and
            manage your account from one place.
          </p>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-950">
              Quick access
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Jump straight into the area you need.
            </p>
          </div>
          <Link
            href="/dashboard/projects"
            className="hidden items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
          >
            View projects <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <DashboardCard key={item.name} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
