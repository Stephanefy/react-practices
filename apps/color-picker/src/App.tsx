import './App.css'
import ColorPickerMain from './components/color-picker-main/color-picker-main'
import { PaletteProvider } from './context/palette-context'

function App() {

  return (
    <PaletteProvider>
      <main>
        <ColorPickerMain />
      </main>
    </PaletteProvider>
  )
}

export default App
