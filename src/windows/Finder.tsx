import { WindowControls } from "#components"
import { locations } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import useLocationStore from "#store/location"
import useWindowStore, { type WindowKey } from "#store/windows"
import clsx from "clsx"
import { Search } from "lucide-react"

const Finder = () => {
  const { openWindow } = useWindowStore()
  const { activeLocation, setActiveLocation } = useLocationStore()

  const openItem = (item: any) => {
    if (item.fileType === "pdf") return openWindow("resume")
    if (item.kind === "folder") return setActiveLocation(item.type as keyof typeof locations)
    if (["fig", "url"].includes(item.fileType) && item.href) 
      return window.open(item.href, "_blank")

    openWindow(`${item.fileType}${item.kind}` as WindowKey, item)
  }

  const renderList = (name: string, items: any[]) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li 
            key={item.id} 
            onClick={() => {
              if (item.type) setActiveLocation(item.type as keyof typeof locations)
            }}
            className={clsx(item.type === activeLocation ? "active" : "not-active")} 
          >
            <img 
              src={item.icon} 
              alt={item.name} 
              className="w-4"
            />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return <>
    <div id="window-header">
      <WindowControls target="finder" />
      <Search className="icon" />
    </div>

    <div className="bg-white flex h-full">
      <div className="sidebar">
        {renderList("Favorites", [locations.work, locations.about, locations.resume, locations.trash])}
        {renderList("Work", locations.work.children)}
      </div>

      <ul className="content">
        {locations[activeLocation]?.children.map((item: any) => (
          <li 
            key={item.id} 
            className={item.position} 
            onClick={() => openItem(item)}
          >
            <img src={item.icon} alt={item.name} />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>

  </>
}

const FinderWindow = WindowWrapper(Finder, "finder")

export default FinderWindow