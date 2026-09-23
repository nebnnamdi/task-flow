"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import PasswordSpinner from "./PasswordSpinner";

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    setError({ status: false, message: "" });

    if (!e.target.email.value) {
      setLoading(false);
      return setError({ status: true, message: "Please enter your email!" });
    }

    const email = e.target.email.value;

    //communicate with the api
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setError({ status: true, message: response.message });
        return;
      }

      const data = await response.json();

      router.push(`${data.resetUrl}`);

      //reset states
      setError({ status: false, message: "" });
      setLoading(false);
    } catch (error) {
      console.error({ error });
    }
  }

  function resetHandler(e) {
    e.target.reset();
    setError({ status: false, message: "" });

    router.push("/login");
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center px-4 bg-slate-50">
      <div className="w-full max-w-md text-sm p-4 shadow-md border bg-white border-slate-100 rounded-2xl">
        <p className="text-2xl font-bold mb-4">Forgot Password</p>

        {error.status && (
          <p className="text-red-500 font-semibold py-4">{error.message}</p>
        )}

        <form onSubmit={submitHandler} onReset={resetHandler}>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
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

export default ForgotPasswordForm;
