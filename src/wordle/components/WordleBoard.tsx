import React from "react";
import { GuessSlot } from "./GuessSlot";
import { WordleProps } from "../../shared/logic/Types";
import { getGuessStatus } from "../logic/helpers";

export const WordleBoard: React.FC<WordleProps> = ({ grid, answer }) => {
  const board = grid.map((row: string[], index: number) => (
    <div key={`row ${index}`} className="row">
      {row.map((letter: string, i: number) => (
        <GuessSlot
          key={`(${index},${i})`}
          row={index}
          col={i}
          letter={letter}
          color={getGuessStatus(grid[index].join(""), i, answer)}
        />
      ))}
    </div>
  ));

  return <div className="board">{board}</div>;
};
