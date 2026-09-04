import { useState, useMemo } from 'react'
import ClientCard from './ClientCard.jsx'

const STATUS_FILTERS = ['all', 'lead', 'in-progress', 'delivered']

function ClientList({ clients }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.fullName.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [clients, search, statusFilter])

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex flex-col sm:flex-row justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
          Clients ({filteredClients.length})
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-1.5 text-sm"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white rounded-lg px-3 py-1.5 text-sm"
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>{s === 'all' ? 'All statuses' : s}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <p className="text-center text-slate-400 mt-10">No clients match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ClientList