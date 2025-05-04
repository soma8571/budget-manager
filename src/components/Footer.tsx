import React, {useContext} from 'react'
import { ThemeContext } from '../App'

function Footer() {

    const { isDarkMode } = useContext(ThemeContext)

  return (
    <footer className={isDarkMode ? "dark-theme" : "light"}>
      Ez itt a footer
    </footer>
  )
}

export default Footer
