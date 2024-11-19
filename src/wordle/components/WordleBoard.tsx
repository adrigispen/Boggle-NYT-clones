import React from "react";
import { GuessSlot } from "./GuessSlot";
import { GuessStatus, WordleProps } from "../../shared/logic/Types";

export const WordleBoard: React.FC<WordleProps> = ({ grid, answer }) => {
  function getGuessStatus(
    index: number,
    letter: string,
    answer: string
  ): GuessStatus {
    if (letter === "") {
      return GuessStatus.OPEN;
    } else if (answer.indexOf(letter.toUpperCase()) === index) {
      return GuessStatus.CORRECT;
    } else if (answer.indexOf(letter.toUpperCase()) !== -1) {
      return GuessStatus.WRONG_POSITION;
    } else {
      return GuessStatus.INCORRECT;
    }
  }
  const board = grid.map((row: string[], index: number) => (
    <div key={`row ${index}`} className="row">
      {row.map((letter: string, i: number) => (
        <GuessSlot
          key={`(${index},${i})`}
          row={index}
          col={i}
          letter={letter}
          color={getGuessStatus(i, letter, answer)}
        />
      ))}
    </div>
  ));

  return <div className="board">{board}</div>;
};
