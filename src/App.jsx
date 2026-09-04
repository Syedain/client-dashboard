import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientWizard from './components/ClientWizard.jsx'
import ClientList from './components/ClientList.jsx'
import ClientDetail from './components/ClientDetail.jsx'
import StatsRow from './components/StatsRow.jsx'

function App() {
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('clients')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('clients', JSON.stringify(clients))
  }, [clients])

  function handleAddClient(newClient) {
    setClients((prev) => [...prev, newClient])
  }

  function updateClient(id, updates) {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-slate-50 py-10 px-4">
              <ClientWizard onAddClient={handleAddClient} />
              <StatsRow clients={clients} />
              <ClientList clients={clients} />
            </div>
          }
        />
        <Route
          path="/client/:id"
          element={<ClientDetail clients={clients} updateClient={updateClient} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App