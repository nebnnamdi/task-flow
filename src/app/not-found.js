import Link from "next/link";

export const metadata = {
  title: "Task-Flow | Not Found",
  description: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 text-gray-900">
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-black mb-6">
        Oops! We couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
