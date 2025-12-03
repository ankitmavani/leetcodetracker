import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DayStatsChart({ questions }) {
  const counts = {
    pending: questions.filter(q => q.status === "pending").length,
    complete: questions.filter(q => q.status === "complete").length,
    revise: questions.filter(q => q.status === "revise").length
  };

  const data = {
    labels: ["Pending", "Complete", "Revise"],
    datasets: [{
      data: [counts.pending, counts.complete, counts.revise],
      backgroundColor: ["#fbbf24", "#34d399", "#60a5fa"],
      borderRadius: 6
    }]
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow mb-4">
      <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
        📊 Day Statistics
      </h3>
      <Bar data={data} height={60} />
    </div>
  );
}
