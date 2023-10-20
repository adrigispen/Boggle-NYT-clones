import React, { Dispatch, useContext, useEffect } from "react";
import { LetterSquare } from "./LetterSquare";
import {
  GridProps,
  WordGameAction,
  WordGameActionType,
} from "../../shared/logic/Types";
import { noHighlights } from "../logic/gridHelpers";
import { WordGameDispatchContext } from "../../shared/logic/Context";

export const Grid: React.FC<GridProps> = ({ grid, selectionGrid }) => {
  const dispatch = useContext(
    WordGameDispatchContext
  ) as Dispatch<WordGameAction>;
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({
        type: WordGameActionType.BOARD_UPDATED,
        payload: {
          selectionGrid: noHighlights(grid.length),
        },
      });
    }, 700);
    return () => clearTimeout(timeout);
  }, [grid.length, selectionGrid, dispatch]);

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
