import React from "react";
import { GuessStatus } from "../../shared/logic/Types";

export const GuessSlot: React.FC<{
  row: number;
  col: number;
  letter: string;
  color: GuessStatus;
}> = ({ row, col, letter, color }) => {
  return (
    <>
      <button id={`(${row}, ${col})`} className={`guess ${color}`}>
        {letter.toUpperCase()}
      </button>
    </>
  );
};
