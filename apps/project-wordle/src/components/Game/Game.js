import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";

const answer = sample(WORDS);

function Game() {
  return (
    <GuessInput answer={answer}/>
  );
}

export default Game;
