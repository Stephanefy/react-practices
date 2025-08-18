import React from "react";
import { range } from "../../utils";
import Row from "../Game/Row";
import Cell from "../Game/Cell";


function GuessResult({ guesses, hasStarted, filledGuessesList  }) {

  return (
    <div className="guess-results">
      {!hasStarted ? guesses.map((guess, idx) => (
        <Row key={idx}>{
          guess.length ? guess.split("").map((l, index) => (
            <Cell key={index}>{l}</Cell>
          )) : range(0,5,1).map((_, index) => (
            <Cell key={index} status="test"></Cell>
          ))
        }
        </Row>
      )) : (
        filledGuessesList?.map((guess, idx) => (
          <Row key={idx + 10}>{
            guess?.length ? guess.map((l, index) => (
              <Cell key={index} status={l.status}>{l.letter}</Cell>
            )) : range(0,5,1).map((_, index) => (
              <Cell key={index} status="test"></Cell>
            ))
          }
          </Row>
        ))
      )}
    </div>
  );
}

export default GuessResult;
