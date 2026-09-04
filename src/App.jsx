import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ClientWizard from './components/ClientWizard.jsx'
import ClientList from './components/ClientList.jsx'
import ClientDetail from './components/ClientDetail.jsx'
import StatsRow from './components/StatsRow.jsx'
import { useTheme } from './context/ThemeContext.jsx'

function App() {

  const { darkMode, toggleDarkMode } = useTheme()
  
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