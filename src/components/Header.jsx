import Link from "next/link";
import Image from "next/image";
import { logout } from "@/actions";
import { auth } from "@/auth";
import { CiLogout } from "react-icons/ci";

const Header = async () => {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-6 z-50">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 cursor-pointer"
      >
        <Image
          src="/images/logo.png"
          width="25"
          height="25"
          alt="logo"
          loading="eager"
        />

        <span>Task-Flow</span>
      </Link>

      <form action={logout} className="flex gap-4 items-center justify-center">
        <p className="text-xs">You are logged in as {session?.user?.email}</p>
        <button
          type="submit"
          className="bg-black text-white py-1 px-4 flex items-center gap-1 cursor-pointer text-xs"
        >
          Log out <CiLogout color="#fff" size={20} />
        </button>
      </form>
    </header>
  );
};

export default Header;
