import React from "react";
import { LetterSquare } from "./LetterSquare";
import { GridProps } from "../../shared/logic/Types";

export const Grid: React.FC<GridProps> = ({ grid, selectionGrid }) => {
  const board = grid.map((row: string[], index: number) => (
    <div key={`row ${index}`} className="row">
      {row.map((letter: string, i: number) => (
        <LetterSquare
          key={`(${index},${i})`}
          row={index}
          col={i}
          letter={letter}
          selected={selectionGrid[index][i]}
        />
      ))}
    </div>
  ));

  return <div className="board">{board}</div>;
};
