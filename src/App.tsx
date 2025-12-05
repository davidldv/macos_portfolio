import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useEffect } from "react"

import { Navbar, Welcome, Dock, Home } from "#components"
import { Terminal, Safari, Resume, Finder, Text, Image, Contact, Photos } from "#windows"
import { useThemeStore } from "./store/theme"

gsap.registerPlugin(Draggable)

const App = () => {
  const { isDarkMode } = useThemeStore()

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />

      <Home />
    </main>
  )
}

export default App
