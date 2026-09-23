"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/actions";
import { toast } from "sonner";
import SubmitButton from "@/components/ui/SubmitButton";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await login(formData);

      if (response?.error) {
        setError(response.error);
        setLoading(false);

        return;
      }

      setError(null);
      setLoading(false);

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="flex items-center justify-center flex-col md:flex-row">
      <div className="hidden md:block">
        <Image
          src="/images/login_img.png"
          width="382"
          height="433"
          alt="Login Image"
          loading="eager"
        />
      </div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-medium pb-3.5">Welcome back!</h1>
        <p className="text-sm pb-2">Welcome back! Please enter your details</p>
        <p className="text-red-500 pb-5">{error}</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-4 pb-2 items-center">
            <label htmlFor="username" className="w-1/4">
              Email:
            </label>
            <input
              name="email"
              type="text"
              id="email"
              placeholder="Email"
              className="w-3/4 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="password" className="w-1/4">
              Password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              className="w-3/4 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <SubmitButton name="Login" loading={loading} />
        </form>
        <p className="text-xs pt-4">
          Forgot password? &nbsp;
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline"
          >
            Forgot password
          </Link>
        </p>
        <p className="text-xs pt-4">
          Don't have an account? &nbsp;
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
