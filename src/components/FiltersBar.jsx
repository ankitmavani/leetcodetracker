export default function FiltersBar({
  search, setSearch,
  selectedDay, setSelectedDay,
  selectedStatus, setSelectedStatus,
  dayList
}) {
  return (
    <div className="card max-w-6xl mx-auto flex gap-4 items-center">

      <select className="input max-w-[150px]" value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
        <option value="">All Days</option>
        {dayList.map(day => <option key={day} value={day}>Day {day}</option>)}
      </select>

      <select className="input max-w-[150px]" value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="pending">⏳ Pending</option>
        <option value="complete">✅ Complete</option>
        <option value="revise">🔁 Revise</option>
      </select>

      <input
        className="input flex-1"
        placeholder="Search question..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
}
