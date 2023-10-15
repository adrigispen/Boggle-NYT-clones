import React from "react";
import { BoardProps } from "../../components/Types";

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
      <button className="endTurn" onClick={shuffleEdgeLetters}>
        Shuffle Letters
      </button>
    </>
  );
};
