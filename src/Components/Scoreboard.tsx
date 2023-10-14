import React, { useContext } from "react";
import { BoggleGame, ScoreboardData } from "./Types";
import { BoggleContext } from "../logic/BoggleContext";

export const Scoreboard: React.FC<ScoreboardData> = ({ endTurn }) => {
  const { playersData, currentPlayer } = useContext(
    BoggleContext
  ) as BoggleGame;
  const { playerName, wordsFound, currentScore } = playersData[currentPlayer];

  const scoreboard = (
    <>
      <h2>
        {playerName}
        <span className="score">{currentScore} points</span>
      </h2>
      <button className="endTurn" onClick={endTurn}>
        End my turn
      </button>

      <ul>
        {wordsFound.map((word, i) => (
          <li key={i}>{word}</li>
        ))}
      </ul>
    </>
  );

  return <div className="wordsFoundDisplay">{scoreboard}</div>;
};
