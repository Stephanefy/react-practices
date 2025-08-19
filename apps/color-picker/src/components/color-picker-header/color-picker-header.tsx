
import { useContext, useState } from "react";
import styles from "./color-picker-header.module.css";
import { PaletteContext } from "../../context/palette-context";

export default function ColorPickerHeader() {

  const { setColorPalette } = useContext(PaletteContext);
  const [currentColor, setCurrentColor] = useState<string>("#000000");

  const onSubmit = async (formData: FormData) => {
    const color = formData.get("color")?.toString().replace("#", "")
    const scheme = formData.get("scheme") as string;

    const response = await fetch(`${import.meta.env.VITE_COLOR_API_BASE_URL}hex=${color}&mode=${scheme}&count=5`);
    const data = await response.json();
    setColorPalette(data.colors.map((color: { hex: { value: string } }) => color.hex.value));
  };


  return (
    <div className={styles.header}>
      <form className={styles.form} action={onSubmit}>
        <div>
          <input
            type="color"
            id="color"
            value={currentColor}
            aria-label="Sélectionner une couleur"
            placeholder="Sélectionner une couleur"
            name="color"
            onChange={(e) => setCurrentColor(e.target.value)}
          />
        </div>
        <div>
          <select
            aria-label="Sélectionner un schéma de couleurs"
            className={styles.scheme}
            name="scheme"
            id="scheme"
          >
            <option value="monochrome">Monochrome</option>
            <option value="monochrome-dark">Monochrome-sombre</option>
            <option value="monochrome-light">Monochrome-léger</option>
            <option value="analogic">Analogique</option>
            <option value="complement">Complementaire</option>
            <option value="analogic-complement">
              Analogique-complementaire
            </option>
            <option value="triad">Triadiqiue</option>
          </select>
        </div>
        <div>
          <button className={styles.button}>Générer une palette</button>
        </div>
      </form>
    </div>
  );
}
