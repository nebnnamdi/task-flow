"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

const DeleteButton = ({ projectId, action }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await action(projectId);

      if (result.success) {
        router.push("/dashboard/projects");
      } else {
        alert(result.error || "Something went wrong");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="flex justify-center items-center border-2 border-red-700 text-red-700 font-semibold bg-red-100 rounded-xl px-4 hover:bg-red-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 cursor-pointer"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
};

export default DeleteButton;
