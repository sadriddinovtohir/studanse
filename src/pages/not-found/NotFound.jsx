import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-4">

      <h1 className="text-7xl font-bold text-red-500">404</h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-400 mt-2 max-w-md">
        The page you are looking for might have been removed,
        had its name changed or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90 transition font-semibold"
      >
        Go Back Home
      </Link>

    </div>
  );
}