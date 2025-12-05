import { useRef } from "react"
import { Tooltip } from "react-tooltip"
import { dockApps } from "#constants"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/windows";
import { useLanguageStore } from "../store/language";
import { translations } from "../constants/translations";

interface DockApp {
  id: string;
  canOpen: boolean;
}

const Dock = () => {
  const { windows, openWindow, closeWindow } = useWindowStore()
  const { language } = useLanguageStore()
  const t = translations[language]
  const dockRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const dock = dockRef.current
    if (!dock) return

    const icons = dock.querySelectorAll(".dock-icon")

    const animateIcons = (mouseX: number) => {
      const { left } = dock.getBoundingClientRect()

      icons.forEach(icon => {
        const { left: iconLeft, width: iconWidth } = icon.getBoundingClientRect()
        const center = iconLeft - left + iconWidth / 2
        const distance = Math.abs(mouseX - center)
        const intensity = Math.exp(-(distance ** 2.5) / 20000)
        
        gsap.to(
          icon, 
          { 
            scale: 1 + intensity * 0.25,
            y: -intensity * 15,
            duration: 0.2,
            ease: "power1.out"
          }
        )
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { left } = dock.getBoundingClientRect()
      const mouseX = e.clientX - left
      animateIcons(mouseX)
    }

    const resetIcons = () => 
      icons.forEach((icon) => 
        gsap.to(icon, { 
          scale: 1, 
          y: 0, 
          duration: 0.3, 
          ease: "power1.out" 
        })
      )

    dock.addEventListener("mousemove", handleMouseMove)
    dock.addEventListener("mouseleave", resetIcons)

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove)
      dock.removeEventListener("mouseleave", resetIcons)
    }
  }, [])


  const toggleApp = (app: DockApp) => {
    if (!app.canOpen) return

    const windowKey = app.id as keyof typeof windows
    const window = windows[windowKey]

    if (!window) {
      console.error(`No window found for key: ${windowKey}`)
      return
    }

    if (window?.isOpen) {
      closeWindow(windowKey)
    } else {
      openWindow(windowKey)
    }

    console.log(`Toggled ${app.id} window`)
  }

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button 
              type="button"
              className="dock-icon"
              aria-label={t.dock[id as keyof typeof t.dock] || name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={t.dock[id as keyof typeof t.dock] || name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img 
                src={`/images/${icon}`}
                alt={t.dock[id as keyof typeof t.dock] || name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"} 
              />
            </button>
          </div>
        ))}

        <Tooltip 
          id="dock-tooltip" 
          place="top" 
          className="tooltip"
        />
      </div>
    </section>
  )
}

export default Dock