import React from "react";
import { ScoreboardData } from "./Types";

export const Scoreboard: React.FC<ScoreboardData> = ({
  playerName,
  wordsFound,
  currentScore,
  endTurn,
}) => {
  const scoreboard = (
    <>
      <h2>{playerName}</h2>
      <button onClick={endTurn}>End my turn</button>
      <h3>{currentScore}</h3>
      <ul>
        {wordsFound.map((word, i) =>
          word.length ? <li key={i}>{word}</li> : <></>
        )}
      </ul>
    </>
  );

  return <div className="scoreboard">{scoreboard}</div>;
};
