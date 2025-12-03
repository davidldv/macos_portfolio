import { useRef, type ComponentType } from "react"
import useWindowStore, { type WindowKey } from "#store/windows"

const WindowWrapper = <P extends object>(Component: ComponentType<P>, windowKey: WindowKey) => {
  const Wrapper = (props: P) => {
    const { focusWindow, windows } = useWindowStore()
    const { isOpen, zIndex } = windows[windowKey]
    const ref = useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    return (
      <section 
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    )
  }

  return Wrapper
}

export default WindowWrapper