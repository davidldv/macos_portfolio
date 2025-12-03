import useWindowStore, { type WindowKey } from "#store/windows"

interface WindowControlsProps {
  target: WindowKey
}

const WindowControls = ({ target }: WindowControlsProps) => {
  const { closeWindow } = useWindowStore()

  return <div id="window-controls">
    <div className="close" onClick={() => closeWindow(target)} />

    {/* TODO: Minimize and maximize buttons */}
    {/* <div className="close" onClick={() => closeWindow(target)} />
    <div className="close" onClick={() => closeWindow(target)} /> */}
  </div>
}

export default WindowControls