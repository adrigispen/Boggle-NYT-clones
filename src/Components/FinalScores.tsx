import React, { useContext } from "react";
import { BoggleGame } from "./Types";
import { BoggleContext } from "../services/BoggleContext";

export const FinalScores: React.FC = () => {
  const game = useContext(BoggleContext) as BoggleGame;
  const scores = game.playersData.map(
    ({ playerName, currentScore, wordsFound }, i) => {
      return (
        <div key={`scores${i}`}>
          <h2>{playerName}</h2>
          <h3>{currentScore}</h3>
          <ul>
            {wordsFound.map((word, index) =>
              word.length ? (
                <li key={`${i},${index}`}>{word}</li>
              ) : (
                <div key={`${i},${index}`} />
              )
            )}
          </ul>
        </div>
      );
    }
  );

  return <div className="scoreboard">{scores}</div>;
};
