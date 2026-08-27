import { auth } from "@/auth";
import DashboardCard from "@/components/ui/DashboardCard";

const items = [
  {
    name: "Projects",
    href: "/projects",
    icon: "FaProjectDiagram",
    others: true,
  },
  { name: "Tasks", href: "/tasks", icon: "BiTask", others: true },
  { name: "Settings", href: "/settings", icon: "IoMdSettings" },
];

const Dashboard = async () => {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center items-center md:items-start">
      <p className="text-2xl font-bold">Welcome back, {session.user?.name}!</p>

      <section className="flex flex-col md:flex-row gap-8 w-full p-4">
        {items.map((item) => (
          <DashboardCard
            name={item.name}
            icon={item.icon}
            href={item.href}
            key={item.name}
            others={item.others}
          />
        ))}
      </section>
    </div>
  );
};

export default Dashboard;
