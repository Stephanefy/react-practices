import { useEffect, useState } from "react";
import { randomizeNewDiceSet } from "./lib/utils";
import Confetti from "react-confetti";

import "./App.css";
import Dice from "./components/dice";

export interface Dice {
  id: number;
  value: number;
  isFrozen: boolean;
}

const initialDiceState = () => randomizeNewDiceSet();

function App() {
  const [dice, setDice] = useState<Array<Dice>>(initialDiceState);
  const [success, setSucces] = useState<boolean>(false);
  const [frozenCount, setFrozenCount] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (frozenCount === 10) {
      setSucces(true);
    }
  }, [frozenCount]);

  dice.forEach((element) => {
    console.log(element);
  });

  function onRoll() {
    setDice(randomizeNewDiceSet(dice));
  }

  function freezeDice(currentDice: Dice) {
    const previousDiceSet = [...dice];

    console.log("selectedd value", selectedValue);

    if (selectedValue !== currentDice.value && selectedValue !== undefined)
      return;

    if (selectedValue === undefined) {
      setSelectedValue(currentDice.value);
    }

    const newDiceSet = previousDiceSet.map((d) => {
      if (d.id === currentDice.id) {
        return { ...d, isFrozen: true };
      }
      return d;
    });

    setFrozenCount((prev) => prev + 1);
    setDice(newDiceSet);
  }

  function resetDiceSet() {
    setSucces(false);
    setDice(initialDiceState);
    setFrozenCount(0);
  }

  return (
    <>
      <main>
        {success && <Confetti />}
        <h1>Tenzies</h1>
        <p>
          Roll the dice until they are all the same, click on dice to freeze
          it's value between rolls
        </p>
        <div className="dice-board">
          <div className="row-1">
            {dice.slice(0, 5).map((d) => (
              <Dice dice={d} freezeDice={freezeDice} />
            ))}
          </div>
          <div className="row-2">
            {dice.slice(6).map((d) => (
              <Dice dice={d} freezeDice={freezeDice} />
            ))}
          </div>
        </div>
        <div className="btn-group">
          <button className="roll-btn" onClick={() => onRoll()}>
            Roll
          </button>
          <button className="reset-btn" onClick={() => resetDiceSet()}>
            Reset Game
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
