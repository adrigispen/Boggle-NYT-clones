import React, { useContext } from "react";
import { BoggleGame, ScoreboardData } from "./Types";
import { BoggleContext } from "../services/BoggleContext";

export const Scoreboard: React.FC<ScoreboardData> = ({ endTurn }) => {
  const { playersData, currentPlayer } = useContext(
    BoggleContext
  ) as BoggleGame;
  const { playerName, wordsFound, currentScore } = playersData[currentPlayer];

  const scoreboard = (
    <>
      <h2>{playerName}</h2>
      <button onClick={endTurn}>End my turn</button>
      <h3>{currentScore}</h3>
      <ul>
        {wordsFound.map((word, i) =>
          word.length ? <li key={i}>{word}</li> : <div key={i} />
        )}
      </ul>
    </>
  );

  return <div className="scoreboard">{scoreboard}</div>;
};
