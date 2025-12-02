import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 }
}

const renderText = (text: string, className: string, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span 
      key={i} 
      className={className} 
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ))
}

const setupTextHover = (container: HTMLElement, type: string) => {
  if (!container) return () => {}

  const letters = container.querySelectorAll("span")
  const { min, max, default: base } = FONT_WEIGHTS[type as keyof typeof FONT_WEIGHTS]

  const animateLetter = (letter: HTMLElement, weight: number, duration = .25) => {
    return gsap.to(
      letter, 
      { 
        duration, 
        ease: "power2.out" ,
        fontVariationSettings: `'wght' ${weight}`
      }
    )
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect()
    const mouseX = e.clientX - left

    letters.forEach(letter => {
      const { left: letterLeft, width: letterWidth } = letter.getBoundingClientRect()
      const distance = Math.abs(mouseX - (letterLeft - left + letterWidth / 2))
      const intensity = Math.exp(-(distance ** 2) / 20000)

      animateLetter(letter, min + (max - min) * intensity)
    })
  }

  const handleMouseLeave = () => {
    letters.forEach(letter => {
      animateLetter(letter, base, .3)
    })
  }

  container.addEventListener("mousemove", handleMouseMove)
  container.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    container.removeEventListener("mousemove", handleMouseMove)
    container.removeEventListener("mouseleave", handleMouseLeave)
  }

}

const Welcome = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current!, "title")
    const subtitleCleanup = setupTextHover(subtitleRef.current!, "subtitle")

    return () => {
      titleCleanup?.()
      subtitleCleanup?.()
    }
  }, [])

  return <section id="welcome">
    <p ref={subtitleRef}>
      {renderText(
        "Hey, I'm David! Welcome to my",
        "text-3xl font-georama",
        100
      )}
    </p>
    <h1 ref={titleRef} className="mt-7">
      {renderText(
        "portfolio",
        "text-9xl italic font-georama"
      )}
    </h1>

    <div className="small-screen">
      <p>This Portfolio is designed for desktop/tablet screens only.</p>
    </div>
  </section>
}
  
export default Welcome