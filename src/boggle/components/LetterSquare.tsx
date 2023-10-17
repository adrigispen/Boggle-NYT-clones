import React from "react";
import { LetterSquareProps } from "../../shared/logic/Types";

export const LetterSquare: React.FC<LetterSquareProps> = ({
  row,
  col,
  letter,
  selected,
}) => {
  return (
    <>
      <button
        id={`(${row}, ${col})`}
        className={selected ? `letterSquare selected` : `letterSquare`}
      >
        {letter.toUpperCase()}
      </button>
    </>
  );
};
