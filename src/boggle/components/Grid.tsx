import React, { useEffect } from "react";
import { LetterSquare } from "./LetterSquare";
import { GridProps } from "../../shared/logic/Types";
import { noHighlights } from "../logic/gridHelpers";

export const Grid: React.FC<GridProps> = ({
  grid,
  selectionGrid,
  updateGrid,
}) => {
  useEffect(() => {
    const timeout = setTimeout(
      () => updateGrid(noHighlights(grid.length)),
      700
    );
    return () => clearTimeout(timeout);
  }, [grid.length, selectionGrid, updateGrid]);

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
