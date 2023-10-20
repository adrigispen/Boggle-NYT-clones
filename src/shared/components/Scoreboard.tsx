import React from "react";
import { ScoreboardData } from "../logic/Types";

export const Scoreboard: React.FC<ScoreboardData> = ({
  playerData,
  endTurn,
  lastPlayer,
}) => {
  const scoreboard = (
    <>
      <h2>
        {playerData.playerName}
        <span className="score">{playerData.currentScore} points</span>
      </h2>
      {!lastPlayer && (
        <button className="endTurn" onClick={endTurn}>
          End my turn
        </button>
      )}
      <ul>
        {playerData.wordsFound.map((word, i) => (
          <li key={i}>{word}</li>
        ))}
      </ul>
    </>
  );

  return <div className="wordsFoundDisplay">{scoreboard}</div>;
};
