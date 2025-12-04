import { socials } from "#constants"
import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"

const Contact = () => {
  return <>
    <div id="window-header">
      <WindowControls target="contact" />
      <h2>Contact Me</h2>
    </div>

    <div className="p-5 space-y-5">
      <img src="/images/adrian.jpg" alt="David" className="w-20 rounded-full" />

      <h3>Let's connect!</h3>
      <p>Got an idea or a bug to squash? Feel free to reach out!</p>

      <div className="flex flex-col gap-2 text-sm">
        <p className="flex items-center gap-2">
          <span className="font-semibold">Email:</span>
          <a href="mailto:dlondon.dev@gmail.com" className="hover:underline">dlondon.dev@gmail.com</a>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold">Phone:</span>
          <a href="tel:+573172939347" className="hover:underline">+57 317 293 9347</a>
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
              <img src={icon} alt={text} className="size-5" />
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