import React from "react";
import GuessResult from "../GuessResult/GuessResult";
import Banner from "../Banner/Banner";
import { range } from "../../utils";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

function GuessInput({ answer }) {
  const [guessInput, setGuessInput] = React.useState("");
  const [guessesList, setGuesesList] = React.useState(range(0, 6, 1));
  const [filledGuessesList, setFilledGuessesList] = React.useState(
    range(0, 6, 1)
  );
  const [index, setIndex] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);
  const [hasWon, setHasWon] = React.useState(false);
  const [hasLost, setHasLost] = React.useState(false);
  const [guessNum, setGuessNum] = React.useState(0);
  const [inputError, setInputError] = React.useState(false);

  const handleChange = (e) => {
    setGuessInput(e.target.value.toUpperCase());
  };

  const handleRestart = () => {
    setGuessInput("");
    setGuesesList(range(0, 6, 1));
    setFilledGuessesList(range(0, 6, 1));
    setIndex(0);
    setHasStarted(false);
    setHasWon(false);
    setHasLost(false);
    setGuessNum(0);
    setInputError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasStarted(true);

    if (index >= NUM_OF_GUESSES_ALLOWED) {
      return;
    }

    if (!isNaN(guessInput)) {
      setInputError(true);

      setTimeout(() => {
        setInputError(false);
      }, 3000);

      return;
    }

    const newGuessList = [...guessesList];

    setIndex((currentIndex) => setIndex(currentIndex + 1));

    newGuessList[index] = guessInput;

    setGuesesList(newGuessList);
    const result = checkGuess(guessInput, answer);

    if (result.every((guess) => guess.status === "correct")) {
      setHasWon(true);
    } else if (guessNum >= NUM_OF_GUESSES_ALLOWED - 1) {
      setHasLost(true);
    }

    setFilledGuessesList((state) => [result, ...state].slice(0, 6));
    setGuessNum((state) => state + 1);
    setGuessInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="guess-input-wrapper">
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          disabled={hasLost || hasWon}
          id="guess-input"
          value={guessInput}
          onChange={handleChange}
          type="text"
          pattern="\w{5,5}"
        />
        {inputError && (
          <p className="error">
            Please enter a valid guess in alphabetic characters
          </p>
        )}
      </form>
      {(hasWon || hasLost) && (
        <button className="restart-button" onClick={handleRestart}>
          Restart
        </button>
      )}
      <GuessResult
        guesses={guessesList}
        filledGuessesList={filledGuessesList}
        guessInput={guessInput}
        hasStarted={hasStarted}
      />
      <Banner
        hasWon={hasWon}
        hasLost={hasLost}
        guessNum={guessNum}
        handleRestart={handleRestart}
        answer={answer}
      />
    </>
  );
}

export default GuessInput;
