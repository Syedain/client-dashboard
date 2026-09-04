function StatsRow({ clients }) {
  const total = clients.length
  const leads = clients.filter((c) => c.status === 'lead').length
  const inProgress = clients.filter((c) => c.status === 'in-progress').length
  const delivered = clients.filter((c) => c.status === 'delivered').length

  const stats = [
    { label: 'Total Clients', value: total, color: 'text-slate-800' },
    { label: 'Leads', value: leads, color: 'text-amber-600' },
    { label: 'In Progress', value: inProgress, color: 'text-blue-600' },
    { label: 'Delivered', value: delivered, color: 'text-emerald-600' },
  ]

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white rounded-xl shadow border border-slate-200 p-4 text-center">
          <div className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</div>
          <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export default StatsRow