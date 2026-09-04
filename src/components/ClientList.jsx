import ClientCard from './ClientCard.jsx'

function ClientList({ clients }) {
  if (clients.length === 0) {
    return (
      <p className="max-w-4xl mx-auto mt-10 text-center text-slate-400">
        No clients yet — add one using the form above.
      </p>
    )
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Clients ({clients.length})</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  )
}

export default ClientList