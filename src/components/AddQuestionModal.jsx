import { useState } from "react";

export default function AddQuestionModal({ close, addQuestion }) {
  const [day, setDay] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [gfg, setGfg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!day || !name || !url) {
      alert("All required fields must be filled");
      return;
    }
    addQuestion({ day, name, url, gfg });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={submit}
        className="card w-full max-w-md">

        <h2 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
          ➕ Add Question
        </h2>

        <div className="space-y-3">
          <input className="input" placeholder="Day Number" value={day} onChange={(e)=>setDay(e.target.value)} />
          <input className="input" placeholder="Question Name" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" placeholder="LeetCode URL" value={url} onChange={(e)=>setUrl(e.target.value)} />
          <input className="input" placeholder="GFG URL (optional)" value={gfg} onChange={(e)=>setGfg(e.target.value)} />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={close} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Add</button>
        </div>

      </form>
    </div>
  );
}
