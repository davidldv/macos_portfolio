import { WindowControls } from "#components"
import { techStack } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import { Check, Flag } from "lucide-react"
import { useLanguageStore } from "../store/language"
import { translations } from "../constants/translations"

const Terminal = () => {
  const { language } = useLanguageStore()
  const t = translations[language]

  return <>
    <div id="window-header">
      <WindowControls target="terminal" />
      <h2>{t.terminal.title}</h2>
    </div>

    <div className="techstack">
      <p>
        <span className="font-bold">@david % </span>
        {t.terminal.command}
      </p>

      <div className="label">
        <p className="w-32">{t.terminal.category}</p>
        <p>{t.terminal.technologies}</p>
      </div>

      <ul className="content">
        {techStack.map(({ category, items }) => (
          <li key={category} className="flex items-center">
            <Check className="check" size={20} />
            <h3>{t.terminal.categories[category as keyof typeof t.terminal.categories] || category}</h3>
            <ul>
              {items.map((item, i) => (
                <li key={i}>{item}{i < items.length - 1 ? "," : ""}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="footnote">
        <p>
          <Check size={20} /> 8 of 8 {t.terminal.loaded}
            (100%)
        </p>

        <p className="text-black dark:text-white">
          <Flag size={15} className="fill-black dark:fill-white" />
          {t.terminal.renderTime}: 6ms
        </p>
      </div>
    </div>
  </>
}

const TerminalWindow = WindowWrapper(Terminal, "terminal")

export default TerminalWindow 