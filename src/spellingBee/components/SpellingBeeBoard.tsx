import React, { useContext } from "react";
import { SpellingBeeGame } from "../../components/Types";
import { SpellingBeeContext } from "../../logic/Context";

export const SpellingBeeBoard: React.FC = () => {
  const game = useContext(SpellingBeeContext) as SpellingBeeGame;
  const board = game.letters.map((elem: string, index: number) => (
    <div key={`${index}`}>{elem}</div>
  ));

  return <div className="board">{board}</div>;
};
