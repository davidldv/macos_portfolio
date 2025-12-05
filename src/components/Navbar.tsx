import dayjs from "dayjs"
import "dayjs/locale/es"
import { Moon, Sun, Languages } from "lucide-react"
import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/windows"
import { useThemeStore } from "../store/theme"
import { useLanguageStore } from "../store/language"
import { translations } from "../constants/translations"

const Navbar = () => {
  const { openWindow } = useWindowStore()
  const { isDarkMode, toggleTheme } = useThemeStore()
  const { language, toggleLanguage } = useLanguageStore()
  const t = translations[language]

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" className="dark:invert" />
        <p className="font-bold dark:text-white">{t.navbar.title}</p>

        <ul>
          {navLinks.map(({ id, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{t.navbar[type as keyof typeof t.navbar]}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={toggleLanguage} className="cursor-pointer p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors" title="Switch Language">
          <Languages size={16} className="text-black dark:text-white" />
        </button>

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

        <time>{dayjs().locale(language).format(language === 'es' ? "ddd D MMM h:mm A" : "ddd MMM D h:mm A")}</time>
      </div>

    </nav>
  )
}

export default Navbar