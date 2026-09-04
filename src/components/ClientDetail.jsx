import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'

const STATUS_OPTIONS = ['lead', 'in-progress', 'delivered']

function ClientDetail({ clients, updateClient }) {
  const { id } = useParams()
  const client = clients.find((c) => c.id === id)
  const [taskText, setTaskText] = useState('')

  if (!client) {
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <p className="text-slate-500 dark:text-slate-400">Client not found.</p>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">← Back to dashboard</Link>
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
      tasks: client.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    })
  }

  function deleteTask(taskId) {
    updateClient(client.id, { tasks: client.tasks.filter((t) => t.id !== taskId) })
  }

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <Link to="/" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">← Back to dashboard</Link>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 p-6 mt-4">
        <h1 className="text-xl font-semibold text-slate-800 dark:text-white">{client.fullName}</h1>
        <p className="text-slate-500 dark:text-slate-400">{client.company} · {client.email}</p>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">{client.projectScope}</p>

        <label className="block mt-4">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Status</span>
          <select
            value={client.status}
            onChange={(e) => updateClient(client.id, { status: e.target.value })}
            className="mt-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm block"
          >
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 p-6 mt-4">
        <h2 className="font-semibold text-slate-800 dark:text-white mb-3">Tasks</h2>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            className="flex-1 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg px-3 py-2 text-sm"
          />
          <button onClick={addTask} className="px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-600 text-white text-sm hover:bg-slate-700">
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {client.tasks.map((task) => (
            <li key={task.id} className="flex items-center gap-2 group">
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
              <span className={`flex-1 text-sm ${task.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-700 dark:text-slate-200'}`}>
                {task.text}
              </span>
              <button onClick={() => deleteTask(task.id)} className="text-xs text-red-400 opacity-0 group-hover:opacity-100">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ClientDetail