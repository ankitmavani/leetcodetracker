import { useState } from "react";
import EditQuestionModal from "./EditQuestionModal";
import DayStatsChart from "./DayStatsChart";

export default function DayCard({
  day, questions,
  search, selectedStatus,
  updateStatus, updateQuestion, deleteQuestion
}) {
  const [editing, setEditing] = useState(null);

  const filtered = questions.filter(q => {
    const matchSearch = q.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !selectedStatus || q.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="card">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          📅 Day {day}
        </h2>
      </div>

      {/* <DayStatsChart questions={questions} /> */}

      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200">
            <th className="p-3 text-left">Question</th>
            <th className="p-3 text-left">Theory</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map(q => (
            <tr key={q.$id}
              className={`border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition
                          ${q.status === "complete" ? "bg-green-100 dark:bg-teal-900/40" : ""}`}>
              
              {/* Question Name */}
              <td className="p-3">
                <a href={q.url} target="_blank" className="text-indigo-600 dark:text-indigo-300 font-semibold hover:underline">
                  {q.name}
                </a>
              </td>

              {/* GFG */}
              <td className="p-3">
                {q.gfg && (
                  <a href={q.gfg} target="_blank" className="bg-orange-500 text-white px-3 py-1 rounded-lg">
                    📘 GFG
                  </a>
                )}
              </td>

              {/* Status */}
              <td className="p-3">
                <select
                  value={q.status}
                  onChange={(e) => updateStatus(q.$id, e.target.value)}
                  className="input max-w-[150px]"
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                  <option value="revise">Revise</option>
                </select>
              </td>

              {/* Actions */}
              <td className="p-3 text-right space-x-4">
                <button
                  onClick={() => setEditing(q)}
                  className="text-blue-500 hover:underline"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => deleteQuestion(q.$id)}
                  className="text-red-500 hover:underline"
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {editing && (
        <EditQuestionModal
          q={editing}
          close={() => setEditing(null)}
          updateQuestion={updateQuestion}
        />
      )}

    </div>
  );
}
