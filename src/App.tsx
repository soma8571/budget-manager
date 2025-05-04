import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { createContext, useContext, useState } from 'react'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'

interface ThemeContextType {
  isDarkMode: boolean,
  toggleTheme: () => void
}
export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: ()=> {}
})

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={isDarkMode ? "container dark-theme" : " container"}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home/>} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  )
}

export default App
