import { useState } from "react";

export default function EditQuestionModal({ close, q, updateQuestion }) {
  const [name, setName] = useState(q.name);
  const [url, setUrl] = useState(q.url);
  const [gfg, setGfg] = useState(q.gfg);
  const [status, setStatus] = useState(q.status);

  const submit = (e) => {
    e.preventDefault();
    updateQuestion({ ...q, name, url, gfg, status });
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <form onSubmit={submit} className="card w-full max-w-md">

        <h2 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
          ✏ Edit Question
        </h2>

        <div className="space-y-3">
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="input" value={url} onChange={(e)=>setUrl(e.target.value)} />
          <input className="input" value={gfg} onChange={(e)=>setGfg(e.target.value)} />

          <select className="input" value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
            <option value="revise">Revise</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={close} className="btn-secondary">Cancel</button>
          <button type="submit" className="btn-primary">Save</button>
        </div>

      </form>
    </div>
  );
}
