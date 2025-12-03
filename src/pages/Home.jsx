import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/20 dark:bg-gray-800/40 border border-white/30 dark:border-gray-700/40 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeIn">

        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide mb-6">
          Welcome .... 👋
        </h1>

        <p className="text-white/90 mb-10 font-medium text-lg">
          Choose a tool to get started
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col gap-5">

          {/* LeetCode Tracker Button */}
          <button
            onClick={() => navigate("/leetcode-tracker")}
            className="w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            🧠 LeetCode Tracker
          </button>

          {/* Habit Tracker Button */}
          <button
            onClick={() => navigate("/habit-tracker")}
            className="w-full py-3 rounded-xl bg-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            📅 Daily Habit Tracker
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="mt-10 text-white/80 text-sm">
        Made with ❤️ using React + Tailwind CSS
      </p>
    </div>
  );
}
