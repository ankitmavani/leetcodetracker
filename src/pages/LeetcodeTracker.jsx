import { useState, useEffect } from "react";
import AddQuestionModal from "../components/AddQuestionModal";
import FiltersBar from "../components/FiltersBar";
import DayCard from "../components/DayCard";
import { databases, DB_ID, COLLECTION_ID } from "../appwrite";

export default function LeetcodeTracker() {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const loadQuestions = async () => {
    const res = await databases.listDocuments(DB_ID, COLLECTION_ID);
    setQuestions(res.documents);
  };

  useEffect(() => loadQuestions(), []);

  const addQuestion = async (q) => {
    await databases.createDocument(DB_ID, COLLECTION_ID, "unique()", {
      day: Number(q.day), name: q.name, url: q.url, gfg: q.gfg, status: "pending"
    });
    loadQuestions();
  };

  const updateStatus = async (id, status) => {
    await databases.updateDocument(DB_ID, COLLECTION_ID, id, { status });
    loadQuestions();
  };

  const updateQuestion = async (q) => {
    await databases.updateDocument(DB_ID, COLLECTION_ID, q.$id, q);
    loadQuestions();
  };

  const deleteQuestion = async (id) => {
    await databases.deleteDocument(DB_ID, COLLECTION_ID, id);
    loadQuestions();
  };

  const dayList = [...new Set(questions.map(q => q.day))].sort((a, b) => a - b);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 dark:from-gray-900 to-gray-100 dark:to-gray-900 px-6 py-8">

        {/* HEADER */}
        <header className="max-w-6xl mx-auto flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r 
                       from-indigo-600 to-purple-500 bg-clip-text text-transparent">
            LeetCode Tracker
          </h1>

          <button
            onClick={() => setDark(!dark)}
            className="btn-secondary"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        {/* ACTION BUTTON */}
        <div className="max-w-6xl mx-auto flex justify-end mb-5">
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            ➕ Add Question
          </button>
        </div>

        {/* FILTERS */}
        <FiltersBar
          search={search} setSearch={setSearch}
          selectedDay={selectedDay} setSelectedDay={setSelectedDay}
          selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}
          dayList={dayList}
        />

        {/* DAY CARDS */}
        <div className="max-w-6xl mx-auto mt-8 space-y-8">
          {dayList
            .filter(day => !selectedDay || selectedDay == day)
            .map(day => (
              <DayCard
                key={day}
                day={day}
                questions={questions.filter(q => q.day == day)}
                search={search}
                selectedStatus={selectedStatus}
                updateStatus={updateStatus}
                updateQuestion={updateQuestion}
                deleteQuestion={deleteQuestion}
              />
          ))}
        </div>

        {isModalOpen && (
          <AddQuestionModal close={() => setIsModalOpen(false)} addQuestion={addQuestion} />
        )}

      </div>
    </div>
  );
}
