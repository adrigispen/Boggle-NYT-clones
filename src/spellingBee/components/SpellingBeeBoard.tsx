import React from "react";
import { BoardProps } from "../../components/Types";

export const SpellingBeeBoard: React.FC<BoardProps> = ({
  centerLetter,
  edgeLetters,
  shuffleEdgeLetters,
  getNewBoard,
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
        <button className="beeButton" onClick={getNewBoard}>
          New Game
        </button>
      </div>
    </>
  );
};
