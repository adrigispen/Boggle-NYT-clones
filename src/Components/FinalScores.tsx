import React from "react";
import { FinalScoresProps } from "./Types";

export const FinalScores: React.FC<FinalScoresProps> = ({ playerData }) => {
  const scores = playerData.map(
    ({ playerName, currentScore, wordsFound }, i) => {
      return (
        <div key={`scores${i}`}>
          <h2>{playerName}</h2>
          <h3>{currentScore}</h3>
          <ul>
            {wordsFound.map((word, i) =>
              word.length ? <li key={i}>{word}</li> : <></>
            )}
          </ul>
        </div>
      );
    }
  );

  return <div className="scoreboard">{scores}</div>;
};
