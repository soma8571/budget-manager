import React, {useContext} from 'react'
import { ThemeContext } from '../App'

function Header() {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext)

  return (
    <header className={isDarkMode ? "dark-theme" : "light"}>
      Ez itt a header

      <button
        onClick={toggleTheme}
        className={isDarkMode ? "dark-btn" : ""}
      >
        {isDarkMode ? "Világos téma" : "Sötét téma"}
      </button>
    </header>
  )
}

export default Header
