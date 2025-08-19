import { createContext, useState } from "react";




export const PaletteContext = createContext<{
  colorPalette: string[];
  setColorPalette: (colorPalette: string[]) => void;
}>({
  colorPalette: [],
  setColorPalette: () => {},
});

export const PaletteProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  return <PaletteContext.Provider value={{ colorPalette, setColorPalette }}>{children}</PaletteContext.Provider>;
};