import React from "react";
import { BeeBoardProps } from "../../shared/logic/Types";
import { SpellingBeeTile } from "./SpellingBeeTile";

export const SpellingBeeBoard: React.FC<BeeBoardProps> = ({
  centerLetter,
  edgeLetters,
  shuffleEdgeLetters,
  playing,
}) => {
  return (
    <>
      <div className="spellingBeeBoard">
        <div className="spellingBeeCol">
          <SpellingBeeTile letter={edgeLetters[0]} />
          <SpellingBeeTile letter={edgeLetters[1]} />
        </div>
        <div className="spellingBeeCol">
          <SpellingBeeTile letter={edgeLetters[2]} />
          <SpellingBeeTile center={true} letter={centerLetter} />
          <SpellingBeeTile letter={edgeLetters[3]} />
        </div>
        <div className="spellingBeeCol">
          <SpellingBeeTile letter={edgeLetters[4]} />
          <SpellingBeeTile letter={edgeLetters[5]} />
        </div>
      </div>
      <div className="beeButtons">
        <button
          className="beeButton"
          onClick={shuffleEdgeLetters}
          disabled={!playing}
        >
          Shuffle Letters
        </button>
      </div>
    </>
  );
};
