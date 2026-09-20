"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useGlobal } from "@/components/GlobalContext";
import UpdateProfile from "./UpdateProfile";
import Spinner from "@/components/ui/Spinner";
import { getAllUsers } from "@/actions";

import { GoShieldCheck } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const SettingsPage = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState({});
  // const { user } = useGlobal();

  // useEffect(() => {
  //   function getCurrentUser() {
  //     setCurrentUser(user);

  //     setIsLoading(false);
  //   }

  //   getCurrentUser();
  // }, []);

  return (
    <div className="flex flex-col pb-24">
      {/* Back to dashboard button */}
      <Link
        href="/dashboard"
        className="cursor-pointer text-xs my-4 text-blue-400 hover:underline w-30"
      >
        &laquo; Back to Dashboard
      </Link>

      <div className="mb-4">
        <p className="text-2xl font-bold ">Settings</p>
        <p className="text-xs font-semibold text-gray-400">
          Manage your account and information.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Account section */}
        <UpdateProfile />

        {/* Security section */}
        <div className="bg-white p-4 rounded-sm flex flex-col gap-2">
          {/* Account details */}
          <div className="flex gap-4 items-center mb-4">
            <span className="bg-blue-100 p-2 rounded-md">
              <GoShieldCheck className="text-blue-500" />
            </span>
            <span>
              <p className="text-sm font-semibold">Security</p>
              <p className="text-xs text-gray-500">
                Manage your account security
              </p>
            </span>
          </div>

          <hr />

          <div className="md:ml-12">
            <span>
              <p className="font-semibold text-xs">Password</p>
            </span>

            <span className="text-xs flex justify-between items-center">
              <p className="text-gray-500">Change your account password</p>

              <Link
                href="/dashboard/settings/password"
                className="py-2 px-4 border border-gray-200 rounded-sm font-semibold text-gray-500 cursor-pointer"
              >
                Change password
              </Link>
            </span>
          </div>
        </div>

        {/* Delete account */}
        <div className="bg-red-50 p-4 rounded-sm flex flex-col gap-2">
          {/* Account details */}
          <div className="flex gap-4 items-center mb-4">
            <span className="bg-red-100 p-2 rounded-md">
              <FaRegTrashAlt className="text-red-500" />
            </span>
            <span>
              <p className="text-sm font-semibold text-red-500">Security</p>
              <p className="text-xs text-gray-500">
                Manage your account security
              </p>
            </span>
          </div>

          <hr />

          <div className="md:ml-12">
            <span>
              <p className="font-semibold text-xs">Delete account</p>
            </span>

            <div className="text-xs flex items-center w-full">
              <div className="w-1/2">
                <p className="text-gray-500">
                  Permanently delete your Task-Flow account and data
                </p>
              </div>

              <div className="w-1/2 text-right cursor-pointer">
                <span
                  onClick={() => alert("Clicked")}
                  className="py-2 px-4 border border-red-200 rounded-sm font-semibold text-red-500 hover:border-0 hover:bg-red-500 hover:text-white cursor-pointer"
                >
                  Delete account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
