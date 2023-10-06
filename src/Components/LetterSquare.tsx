import React from "react";
import { LetterSquareProps } from "./Settings.types";
import { useState } from "react";

export const LetterSquare: React.FC<LetterSquareProps> = ({
  row,
  col,
  letter,
}) => {
  const [selected, setSelected] = useState(false);

  function handleClick() {
    setSelected(!selected);
  }

  return (
    <>
      <button
        id={`(${row}, ${col})`}
        key={`(${row}, ${col})`}
        className={selected ? `letterSquare selected` : `letterSquare`}
        onClick={handleClick}
      >
        {letter.toUpperCase()}
      </button>
    </>
  );
};
