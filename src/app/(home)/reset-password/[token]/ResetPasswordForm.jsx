"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import PasswordSpinner from "../../forgot-password/PasswordSpinner";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { password, confirmPassword } = formData;

  const router = useRouter();
  const params = useParams();

  function handleChange(e) {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setError({ status: false, message: "" });

    //validation
    if (!password) {
      setLoading(false);
      return setError({ status: true, message: "Please enter your password!" });
    } else if (!confirmPassword) {
      setLoading(false);
      return setError({
        status: true,
        message: "Please confirm your password!",
      });
    } else if (password.length < 4) {
      setLoading(false);
      return setError({
        status: true,
        message: "Password must be at least 4 characters long!",
      });
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return setError({ status: true, message: "Passwords do not match!" });
    }

    //communicate with the api
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, token: params.token }),
      });

      const data = await response.json();

      if (!data.ok) {
        setError({ status: true, message: data.message });
        setLoading(false);
        return;
      }

      router.push("/login");

      //reset states
      setFormData({ password: "", confirmPassword: "" });
      setError({ status: false, message: "" });
      setLoading(false);
      toast.success(data.message);
    } catch (error) {
      console.error({ error });
    }
  }

  function resetHandler() {
    setFormData({ password: "", confirmPassword: "" });
    setError({ status: false, message: "" });

    router.push("/login");
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 bg-slate-50">
      <div className="w-full max-w-md text-sm p-4 shadow-md border bg-white border-slate-100 rounded-2xl">
        <p className="text-2xl font-bold mb-4">Reset Password</p>

        {error.status && (
          <p className="text-red-500 font-semibold py-4">{error.message}</p>
        )}

        <form
          onSubmit={submitHandler}
          onReset={resetHandler}
          className="flex flex-col gap-4"
        >
          {/* password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Enter password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border px-4 py-2"
            />
          </div>

          {/* confirm password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Re-Enter password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="email"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="border px-4 py-2"
            />
          </div>

          <div className="flex flex-col gap-4 mt-4 w-full">
            <button
              type="submit"
              className={`bg-black text-white py-2 hover:bg-gray-800 hover:text-gray-200 cursor-pointer ${loading && "pointer-events-none opacity-50"}`}
              disabled={loading}
            >
              {loading ? <PasswordSpinner /> : "Reset password"}
            </button>

            {!loading && (
              <button
                type="reset"
                className="bg-white text-black border py-2 hover:border-gray-100 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
