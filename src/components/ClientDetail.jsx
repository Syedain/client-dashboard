import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'

const STATUS_OPTIONS = ['lead', 'in-progress', 'delivered']

function ClientDetail({ clients, updateClient }) {
  // useParams reads the :id part of the URL (e.g. /client/abc123 -> id = "abc123")
  const { id } = useParams()
  const client = clients.find((c) => c.id === id)

  const [taskText, setTaskText] = useState('')

  if (!client) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <p className="text-slate-500">Client not found.</p>
        <Link to="/" className="text-blue-600 hover:underline">← Back to dashboard</Link>
      </div>
    )
  }

  function addTask() {
    if (!taskText.trim()) return
    const newTask = { id: crypto.randomUUID(), text: taskText, done: false }
    updateClient(client.id, { tasks: [...client.tasks, newTask] })
    setTaskText('')
  }

  function toggleTask(taskId) {
    updateClient(client.id, {
      tasks: client.tasks.map((t) =>
        t.id === taskId ? { ...t, done: !t.done } : t
      ),
    })
  }

  function deleteTask(taskId) {
    updateClient(client.id, {
      tasks: client.tasks.filter((t) => t.id !== taskId),
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="text-sm text-blue-600 hover:underline">← Back to dashboard</Link>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mt-4">
          <h1 className="text-xl font-semibold text-slate-800">{client.fullName}</h1>
          <p className="text-slate-500">{client.company} · {client.email}</p>
          <p className="text-sm text-slate-400 mt-2">{client.projectScope}</p>

          <label className="block mt-4">
            <span className="text-sm font-medium text-slate-600">Status</span>
            <select
              value={client.status}
              onChange={(e) => updateClient(client.id, { status: e.target.value })}
              className="mt-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 mt-4">
          <h2 className="font-semibold text-slate-800 mb-3">Tasks</h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a task..."
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={addTask}
              className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm hover:bg-slate-700"
            >
              Add
            </button>
          </div>

          <ul className="space-y-2">
            {client.tasks.map((task) => (
              <li key={task.id} className="flex items-center gap-2 group">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={`flex-1 text-sm ${task.done ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs text-red-400 opacity-0 group-hover:opacity-100"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ClientDetail