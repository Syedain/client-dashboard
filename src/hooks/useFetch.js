import { useState, useEffect } from 'react'

// A reusable hook for any fetch() call: give it a URL, get back
// { data, loading, error } — the three states every API call has.
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false // guards against setting state after unmount

    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const json = await response.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()

    return () => { cancelled = true } // cleanup function
  }, [url])

  return { data, loading, error }
}

export default useFetch