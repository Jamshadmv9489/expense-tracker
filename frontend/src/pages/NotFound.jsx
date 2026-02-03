import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="text-center max-w-md">

        {/* Big 404 */}
        <h1 className="text-7xl sm:text-8xl font-extrabold text-blue-600">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm sm:text-base text-gray-500">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action Button */}
        <Link
          to="/login"
          className="
            inline-flex items-center justify-center mt-6 rounded-lg
            bg-blue-600 px-6 py-3
            text-sm font-semibold text-white
            transition hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-blue-500/50
          "
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}
