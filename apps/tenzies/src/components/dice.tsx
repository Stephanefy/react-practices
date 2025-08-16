import { useRef, useEffect } from "react";
import type { Dice } from "../App";

interface Props {
  dice: Dice;
  freezeDice: (currentDice: Dice) => void;
}

export default function Dice({ dice, freezeDice }: Props) {
  const ref = useRef(null);

  return (
    <div
      className={`dice ${dice.isFrozen && "frozen"}`}
      ref={ref}
      onClick={() => freezeDice(dice)}
    >
      {dice.value}
    </div>
  );
}
