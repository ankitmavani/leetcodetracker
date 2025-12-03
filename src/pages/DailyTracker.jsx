import { useState, useEffect } from "react";
import { databases, DB_ID, HABIT_COLLECTION } from "../appwrite";

const DOC_ID = "692ff3040010aef514ad";

// default array of 30 days
const generateDays = () => Array(30).fill("pending");

// Convert array → JSON string
const serialize = (data) => JSON.stringify(data);

// Convert string → array
const deserialize = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    return [];
  }
};

export default function DailyTracker() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [loading, setLoading] = useState(true);

  // ------------ LOAD FROM APPWRITE ------------
  const loadFromAppwrite = async () => {
    try {
      const doc = await databases.getDocument(DB_ID, HABIT_COLLECTION, DOC_ID);

      const parsed = deserialize(doc.habits || "[]");
      setHabits(parsed);

    } catch (error) {
      console.error("Error loading habits:", error);

      // If missing => create new blank document
      if (error.code === 404) {
        await databases.createDocument(DB_ID, HABIT_COLLECTION, DOC_ID, {
          habits: serialize([]),
        });

        setHabits([]);
      }
    }

    setLoading(false);
  };

  // ------------ SAVE TO APPWRITE ------------
  const saveToAppwrite = async (updatedHabits) => {
    try {
      await databases.updateDocument(DB_ID, HABIT_COLLECTION, DOC_ID, {
        habits: serialize(updatedHabits),
      });
    } catch (error) {
      console.error("Error saving habits:", error);
    }
  };

  // Load on mount
  useEffect(() => {
    loadFromAppwrite();
  }, []);

  // Auto-save
  useEffect(() => {
    if (!loading) saveToAppwrite(habits);
  }, [habits]);

  // ------------ ADD HABIT ------------
  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      days: generateDays(),
    };

    setHabits((prev) => [...prev, habit]);
    setNewHabit("");
  };

  // ------------ CYCLE STATUS ------------
  const cycleStatus = (habitIndex, dayIndex) => {
    setHabits((prev) => {
      const updated = [...prev];
      const current = updated[habitIndex].days[dayIndex];

      const next =
        current === "pending"
          ? "completed"
          : current === "completed"
          ? "failed"
          : "pending";

      updated[habitIndex].days[dayIndex] = next;
      return updated;
    });
  };

  if (loading)
    return (
      <div className="text-center p-10 text-xl font-semibold">
        Loading habits...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 text-gray-900 dark:text-gray-100">
      <div className="mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold mb-6">Daily Habit Tracker</h1>

        {/* Add Habit */}
        <div className="flex gap-3 mb-6">
          <input
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
            placeholder="Enter new habit..."
            className="flex-1 px-4 py-2 rounded-xl border dark:bg-gray-700 dark:border-gray-600"
          />

          <button
            onClick={addHabit}
            className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded-xl shadow-sm dark:border-gray-700">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="w-[100px] p-3 text-left font-semibold sticky left-0 bg-gray-200 dark:bg-gray-700 border-r dark:border-gray-600">
                  Habit
                </th>

                {Array.from({ length: 30 }).map((_, i) => (
                  <th key={i} className="p-2 font-semibold">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {habits.map((habit, habitIndex) => (
                <tr key={habit.id} className="border-t dark:border-gray-700">
                  <td className="p-3 font-medium sticky left-0 bg-white dark:bg-gray-800 border-r dark:border-gray-600 shadow-md">
                    {habit.name}
                  </td>

                  {habit.days.map((status, dayIndex) => (
                    <td
                      key={dayIndex}
                      onClick={() => cycleStatus(habitIndex, dayIndex)}
                      className={[
                        "w-10 h-10 cursor-pointer border dark:border-gray-700 transition",
                        status === "pending"
                          ? "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                          : status === "completed"
                          ? "bg-green-400 hover:bg-green-500"
                          : "bg-red-400 hover:bg-red-500",
                      ].join(" ")}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
