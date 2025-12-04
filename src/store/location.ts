import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

import { locations } from "#constants"

const DEFAULT_LOCATION: keyof typeof locations = "work"

interface LocationState {
  activeLocation: keyof typeof locations
  setActiveLocation: (location: keyof typeof locations) => void
  resetActiveLocation: () => void
}

const useLocationStore = create<LocationState>()(
  immer((set) => ({
    activeLocation: DEFAULT_LOCATION,

    setActiveLocation: (location) =>
      set((state) => {
        if (location === undefined) return
        state.activeLocation = location
      }),

    resetActiveLocation: () =>
      set((state) => {
        state.activeLocation = DEFAULT_LOCATION
      }),
  }))
)

export default useLocationStore