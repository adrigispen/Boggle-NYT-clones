import React from "react";
import { BoardProps } from "../../shared/logic/Types";

export const SpellingBeeBoard: React.FC<BoardProps> = ({
  centerLetter,
  edgeLetters,
  shuffleEdgeLetters,
}) => {
  return (
    <>
      <div className="spellingBeeBoard">
        <div className="spellingBeeRow">
          <button className="hexagon">{edgeLetters[0].toUpperCase()}</button>
        </div>
        <div className="spellingBeeRow">
          <button className="hexagon">{edgeLetters[1].toUpperCase()}</button>
          <button className="hexagon">{edgeLetters[2].toUpperCase()}</button>
        </div>
        <div className="spellingBeeRow">
          <button className="hexagon centerTile">
            {centerLetter.toUpperCase()}
          </button>
        </div>
        <div className="spellingBeeRow">
          <button className="hexagon">{edgeLetters[3].toUpperCase()}</button>
          <button className="hexagon">{edgeLetters[4].toUpperCase()}</button>
        </div>
        <div className="spellingBeeRow">
          <button className="hexagon">{edgeLetters[5].toUpperCase()}</button>
        </div>
      </div>
      <div className="beeButtons">
        <button className="beeButton" onClick={shuffleEdgeLetters}>
          Shuffle Letters
        </button>
      </div>
    </>
  );
};
