"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { getUser, changePassword } from "@/actions";
import { useGlobal } from "@/components/GlobalContext";
import { MdLockOutline } from "react-icons/md";
import PasswordInput from "./PasswordInput";

const ChangePassword = () => {
  const [password, setPassword] = useState({ old: "", new: "", confirm: "" });
  const [error, setError] = useState({ message: "", old: false, new: false });
  const [status, setStatus] = useState({
    success: false,
    message: "",
  });

  const { user } = useGlobal();
  const email = user?.email;

  const router = useRouter();

  // useEffect(() => {
  //   async function fetchUser() {
  //     const fetchedUser = await getUser(email);
  //     const { password } = fetchedUser;
  //     console.log(fetchedUser.password);
  //   }
  //   fetchUser();
  // }, [email]);

  const handleChange = (e) => {
    setError({ message: "", old: false, new: false });
    setPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCancel = (e) => {
    e.preventDefault();

    setPassword({ old: "", new: "", confirm: "" });
    setError({ message: "", old: false, new: false });
    router.push("/dashboard/settings");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password.new !== password.confirm)
      return setError((prev) => {
        return {
          ...prev,
          message: "Passwords do not match",
          new: true,
        };
      });

    const res = await changePassword(email, password.old, password.new);

    if (!res.success)
      return setError((prev) => {
        return {
          ...prev,
          message: res.error,
          old: true,
        };
      });

    setStatus({ success: true, message: res.message });
    setPassword({ old: "", new: "", confirm: "" });
  };

  return (
    <div className="flex flex-col pb-24">
      {/* Back to dashboard button */}
      <Link
        href="/dashboard/settings"
        className="cursor-pointer text-xs my-4 text-blue-400 hover:underline w-30"
      >
        &laquo; Back to Settings
      </Link>

      <div className="mb-4">
        <p className="text-2xl font-bold ">Change Password</p>
        <p className="text-xs font-semibold text-gray-400">
          Keep your account secure by changing your password.
        </p>
      </div>

      <div className="bg-white p-4 rounded-sm flex flex-col gap-2">
        <div className="flex gap-4 items-center mb-4">
          <span className="bg-blue-100 p-2 rounded-md">
            <MdLockOutline className="text-blue-500" />
          </span>
          <span>
            <p className="text-sm font-semibold">Update your password</p>
            <p className="text-xs text-gray-500">
              Enter your new password and confirm it
            </p>
          </span>
        </div>

        <div
          className={`text-sm md:ml-12 font-semibold ${status.success ? "text-green-500" : "text-red-500"}`}
        >
          <p>
            {error && error.message}
            {status.success && status.message}
          </p>
        </div>

        <form
          onSubmit={handlePasswordSubmit}
          onReset={handleCancel}
          className="flex flex-col gap-4"
        >
          <PasswordInput
            name="old"
            value={password.old}
            placeholder="Enter your old password"
            label="Current Password"
            error={error.old}
            onChange={handleChange}
          />
          <PasswordInput
            name="new"
            value={password.new}
            placeholder="Enter your new password"
            label="New Password"
            error={error.new}
            onChange={handleChange}
          />
          <PasswordInput
            name="confirm"
            value={password.confirm}
            placeholder="Confirm your new password"
            label="Confirm Password"
            error={error.new}
            onChange={handleChange}
          />

          <div className="flex gap-4 flex-col md:flex-row md:justify-end">
            <button
              type="reset"
              className="text-sm bg-white border border-gray-400 text-gray-500 py-2 px-4 rounded-md cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-black text-sm text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
