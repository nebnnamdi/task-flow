"use client";

import Link from "next/link";
import SubmitButton from "@/components/ui/SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  //form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  //error states
  const [errors, setErrors] = useState({
    error: "",
    isError: false,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      return { ...prevState, [name]: value };
    });

    //reset error states

    setErrors((prevState) => ({ ...prevState, error: "", isError: false }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const localErrors = {};

    if (formData.password !== formData.confirmPassword) {
      localErrors.error = "Passwords do not match";
      localErrors.isError = true;
    }

    if (formData.password.length < 4) {
      localErrors.error = "Password must be at least 4 characters";
      localErrors.isError = true;
    }

    if (Object.keys(localErrors).length > 0) {
      setErrors(localErrors);

      return;
    }

    const regData = {
      name,
      email,
      password,
    };

    // send to api
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regData),
      });

      if (response.status !== 201) {
        setErrors((prevState) => ({
          ...prevState,
          error: response.statusText,
          isError: true,
        }));
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        error: "Error captured: " + error,
        isError: true,
      }));
    }
  }

  return (
    <div className="flex items-center justify-center">
      <div></div>

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-medium pb-3.5">Sign Up</h1>

        <div>
          {errors.isError ? (
            <p className="text-red-500 text-sm pb-4">{errors.error}</p>
          ) : null}
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 pb-2">
            <label htmlFor="username" className="w-1/4">
              Name:
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-3/4 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="flex items-center gap-2 pb-2">
            <label htmlFor="email" className="w-1/4">
              Email:
            </label>
            <input
              name="email"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-3/4 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="password" className="w-1/4">
              Password:
            </label>
            <input
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-3/4 px-3.5 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="confirmPassword" className="w-1/4">
              Re-enter Password:
            </label>
            <input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter Password"
              className={`w-3/4 px-3.5 py-2 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none transition duration-200 $"bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " `}
              required
            />
          </div>

          <SubmitButton name="Sign Up" />
        </form>

        <p className="text-xs pt-5">
          Already have an account? &nbsp;
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
