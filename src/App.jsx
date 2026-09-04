import ClientWizard from './components/ClientWizard.jsx'

function App() {
  // For now, just log the new client to the console when added.
  // Next feature, this will save into a real client list instead.
  function handleAddClient(client) {
    console.log('New client:', client)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <ClientWizard onAddClient={handleAddClient} />
    </div>
  )
}

export default App