import React from "react";
import { GridProps } from "./Settings.types";
import { LetterSquare } from "./LetterSquare";

export const Grid: React.FC<GridProps> = ({ grid }) => {

  const board = grid.map((row: string[], index: number) => (
    <div className="row">
      {row.map((letter: string, i: number) => (
        <LetterSquare row={index} col={i} letter={letter} />
      ))}
    </div>
  ));

  return <div className="board">{board}</div>;
};
