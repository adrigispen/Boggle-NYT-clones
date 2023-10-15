import React, { useContext } from "react";
import { BoggleGame } from "./Types";
import { LetterSquare } from "./LetterSquare";
import { BoggleContext } from "../logic/Context";

export const Grid: React.FC = () => {
  const game = useContext(BoggleContext) as BoggleGame;
  const board = game.grid.map((row: string[], index: number) => (
    <div key={`row ${index}`} className="row">
      {row.map((letter: string, i: number) => (
        <LetterSquare
          key={`(${index},${i})`}
          row={index}
          col={i}
          letter={letter}
          selected={game.selectionGrid[index][i]}
        />
      ))}
    </div>
  ));

  return <div className="board">{board}</div>;
};
