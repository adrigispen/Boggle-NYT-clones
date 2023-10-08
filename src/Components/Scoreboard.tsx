import React from "react";
import { PlayerData } from "./Types";

export const Scoreboard: React.FC<PlayerData> = ({
  playerName,
  wordsFound,
  currentScore,
}) => {
  const scoreboard = (
    <>
      <h2>{playerName}</h2>
      <h3>{currentScore}</h3>
      <ul>
        {wordsFound.map((word, i) => (
          <li key={i}>{word}</li>
        ))}
      </ul>
    </>
  );

  return <div className="scoreboard">{scoreboard}</div>;
};
