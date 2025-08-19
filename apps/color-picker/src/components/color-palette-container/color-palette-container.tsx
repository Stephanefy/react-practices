import { useContext } from "react";
import styles from "./color-palette-container.module.css";
import { PaletteContext } from "../../context/palette-context";

export default function ColorPaletteContainer() {

  const { colorPalette } = useContext(PaletteContext);

  if (colorPalette.length === 0) return null;

  return <div className={styles.container}>
    {colorPalette.map((color) => (
      <div key={color} className={styles['color-palette']} style={{ backgroundColor: color }}></div>
    ))}
    {colorPalette.map((color, index) => (
      <div key={index} className={styles['color-code']}><span>{color}</span></div>
    ))}
  </div>;
}