import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage.js'
import useFetch from './hooks/useFetch.js'
import { useTheme } from './context/ThemeContext.jsx'
import ClientWizard from './components/ClientWizard.jsx'
import ClientList from './components/ClientList.jsx'
import ClientDetail from './components/ClientDetail.jsx'
import StatsRow from './components/StatsRow.jsx'

function App() {
  const { darkMode, toggleDarkMode } = useTheme()
  const [clients, setClients] = useLocalStorage('clients', [])
  const [seeded, setSeeded] = useLocalStorage('seeded', false)

  const { data: users, loading, error } = useFetch(
    !seeded ? 'https://jsonplaceholder.typicode.com/users' : null
  )

  // Once the seed data arrives (and only if we haven't seeded before),
  // turn it into client objects and add them to the list.
  if (users && !seeded) {
    const seedClients = users.slice(0, 3).map((user) => ({
      id: crypto.randomUUID(),
      fullName: user.name,
      email: user.email,
      company: user.company.name,
      projectScope: 'Demo project seeded from API',
      plan: 'starter',
      status: 'lead',
      tasks: [],
      createdAt: new Date().toISOString(),
    }))
    setClients((prev) => [...prev, ...seedClients])
    setSeeded(true)
  }

  function handleAddClient(newClient) {
    setClients((prev) => [...prev, newClient])
  }

  function updateClient(id, updates) {
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  return (
    <BrowserRouter>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
          <div className="max-w-4xl mx-auto pt-6 px-4 flex justify-end">
            <button
              onClick={toggleDarkMode}
              className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-sm dark:text-white"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          {!seeded && loading && (
            <p className="text-center text-slate-400 mt-6">Loading demo clients...</p>
          )}
          {!seeded && error && (
            <p className="text-center text-red-400 mt-6">Couldn't load demo data: {error}</p>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <div className="py-6 px-4">
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
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App