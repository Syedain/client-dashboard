import { useState, useEffect } from 'react'

// A reusable version of the "load from localStorage, save on change" pattern
// we've now written twice by hand. `key` is the localStorage key name,
// `initialValue` is what to use if nothing's saved yet.
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  // Returns the SAME shape useState does: [value, setter] — that's what
  // makes it feel like a natural drop-in replacement.
  return [value, setValue]
}

export default useLocalStorage