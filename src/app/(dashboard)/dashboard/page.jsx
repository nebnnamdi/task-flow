import { auth } from "@/auth";
import { logout } from "@/actions";

const Dashboard = async () => {
  const session = await auth();

  console.log(session);
  return (
    <div>
      <p>Welcome back, {session.user?.name}</p>

      <form action={logout}>
        <button
          type="submit"
          className="bg-black text-white cursor-pointer p-2"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
