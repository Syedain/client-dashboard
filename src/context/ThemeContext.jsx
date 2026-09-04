import { createContext, useContext, useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage.js'

// createContext makes a "channel" that any component can tune into.
const ThemeContext = createContext(null)

// This Provider component wraps your whole app. Anything INSIDE it can
// access the theme, no matter how deeply nested.
export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)

  function toggleDarkMode() {
    setDarkMode((prev) => !prev)
  }

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

// A small custom hook (Feature 6 sneak peek!) so components don't need to
// import useContext + ThemeContext separately every time — they just call
// useTheme() and get { darkMode, toggleDarkMode } directly.
export function useTheme() {
  return useContext(ThemeContext)
}