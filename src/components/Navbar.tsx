import dayjs from "dayjs"
import { Moon, Sun } from "lucide-react"
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/windows"
import { useThemeStore } from "../store/theme"

const Navbar = () => {
  const { openWindow } = useWindowStore()
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" className="dark:invert" />
        <p className="font-bold dark:text-white">David's Portfolio</p>

        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={toggleTheme} className="cursor-pointer p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
          {isDarkMode ? <Sun size={16} className="text-white" /> : <Moon size={16} className="text-black" />}
        </button>

        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} className="icon-hover dark:invert" alt={`icon-${id}`} />
            </li>  
          ))}
        </ul>

        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>

    </nav>
  )
}

export default Navbar