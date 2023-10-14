import React, { useContext } from "react";
import { BoggleGame } from "./Types";
import { BoggleContext } from "../logic/BoggleContext";

export const FinalScores: React.FC = () => {
  const game = useContext(BoggleContext) as BoggleGame;
  const scores = game.playersData.map(
    ({ playerName, currentScore, wordsFound }, i) => {
      return (
        <div key={`scores${i}`}>
          <h2>
            {playerName}
            <span className="score">{currentScore}</span>
          </h2>
          <ul>
            {wordsFound.map((word, index) => (
              <li
                key={`${i},${index}`}
                dangerouslySetInnerHTML={{ __html: word }}
              ></li>
            ))}
          </ul>
        </div>
      );
    }
  );

  return <div className="wordsFoundDisplay">{scores}</div>;
};
