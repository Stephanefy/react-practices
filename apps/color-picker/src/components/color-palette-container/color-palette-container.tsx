import { useContext } from "react";
import styles from "./color-palette-container.module.css";
import { PaletteContext } from "../../context/palette-context";
import { useClipboard } from "../../hooks/useClipboad";

export default function ColorPaletteContainer() {

  const { colorPalette } = useContext(PaletteContext);
  const { copy, isCopied } = useClipboard();

  if (colorPalette.length === 0) return null;

  return <div className={styles.container}>
    {colorPalette.map((color) => (
      <div key={color} className={styles['color-palette']} style={{ backgroundColor: color }}></div>
    ))}
    {colorPalette.map((color, index) => (
      <div key={index} className={styles['color-code']}><span onClick={() => copy(color)} >{color}</span></div>
    ))}
    {isCopied && <div className={styles['copied-message']}>Copied to clipboard</div>}
  </div>;
}