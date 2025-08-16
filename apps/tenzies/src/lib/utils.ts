import type { Dice } from "../App.tsx";

export function generateRandomValue(): number {
  return Math.floor(Math.random() * 9 + 1);
}

export function randomizeNewDiceSet(prevDiceState?: Dice[]) {
  let randomizedDice: Dice[] = [];

  if (prevDiceState) {
    const newRandomizedDice = prevDiceState.map((dice) => {
      if (dice.isFrozen) {
        return {
          ...dice,
        };
      } else {
        return {
          ...dice,
          value: generateRandomValue(),
        };
      }
    });
    randomizedDice = [...newRandomizedDice];
  } else {
    for (let i = 0; i <= 10; i++) {
      const dice: Dice = {
        id: i + 1,
        isFrozen: false,
        value: generateRandomValue(),
      };
      randomizedDice.push(dice);
    }
  }
  return randomizedDice;
}
