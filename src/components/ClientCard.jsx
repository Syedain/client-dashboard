import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  lead: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
}

const STATUS_LABELS = {
  lead: 'Lead',
  'in-progress': 'In Progress',
  delivered: 'Delivered',
}

function ClientCard({ client }) {
  return (
    <Link
      to={`/client/${client.id}`}
      className="block bg-white dark:bg-slate-800 rounded-xl shadow border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-400 dark:hover:border-slate-500 transition"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-slate-800 dark:text-white">{client.fullName}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{client.company}</p>
        </div>
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_STYLES[client.status]}`}>
          {STATUS_LABELS[client.status]}
        </span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{client.email}</p>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 line-clamp-2">{client.projectScope}</p>
    </Link>
  )
}

export default ClientCard