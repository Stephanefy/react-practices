import styles from "./color-picker-main.module.css";
import ColorPickerHeader from "../color-picker-header/color-picker-header";
import ColorPaletteContainer from "../color-palette-container/color-palette-container";

export default function ColorPickerMain() {
  return (
    <div className={styles.container}>
      <ColorPickerHeader />
      <ColorPaletteContainer />
    </div>
  );
}
