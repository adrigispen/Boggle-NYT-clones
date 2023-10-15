import React from "react";
import { FinalScoresProps } from "./Types";

export const FinalScores: React.FC<FinalScoresProps> = ({ playersData }) => {
  const scores = playersData.map(
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
