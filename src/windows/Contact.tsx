import { socials } from "#constants"
import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
import { useLanguageStore } from "../store/language"
import { translations } from "../constants/translations"

const Contact = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return <>
    <div id="window-header">
      <WindowControls target="contact" />
      <h2>{t.contact.title}</h2>
    </div>

    <div className="p-5 space-y-5 dark:text-gray-300">
      <img src="/images/david.jpg" alt="David" className="w-20 rounded-full" />

      <h3>{t.contact.subtitle}</h3>
      <p>{t.contact.description}</p>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex items-center gap-2">
          <span className="font-semibold">{t.contact.email}</span>
          <a href="mailto:dlondon.dev@gmail.com" className="hover:underline text-blue-600 dark:text-blue-400">dlondon.dev@gmail.com</a>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">{t.contact.phone}</span>
          <a href="tel:+573172939347" className="hover:underline text-blue-600 dark:text-blue-400">+57 317 293 9347</a>
        </p>
      </div>

      <ul>
        {socials.map(({ id, bg, link, icon, text }) => (
          <li key={id} style={{ backgroundColor: bg }}>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cursor-pointer"
              title={text}
            >
              <img src={icon} alt={text} className="size-5 invert" />
              <p>{text}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
}

const ContactWindow = WindowWrapper(Contact, "contact")

export default ContactWindow