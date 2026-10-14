import Link from "next/link";
import Image from "next/image";
import { logout } from "@/actions";
import { auth } from "@/auth";
import { CiLogout } from "react-icons/ci";

const Header = async () => {
  const session = await auth();
  const name =
    session?.user?.name || session?.user?.email?.split("@")[0] || "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-4 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
            <Image
              src="/images/logo.png"
              width="22"
              height="22"
              alt="Task-Flow logo"
              loading="eager"
              className=""
            />
          </span>
          <span className="text-base font-bold tracking-tight text-slate-950">
            Task-Flow
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-slate-900">{name}</p>
            <p className="max-w-48 truncate text-[11px] text-slate-400">
              {session?.user?.email}
            </p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
            {initial}
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              <CiLogout size={17} aria-hidden="true" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
