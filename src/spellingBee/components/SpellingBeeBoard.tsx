import React, { Dispatch, useContext } from "react";
import {
  BeeBoardProps,
  WordGameAction,
  WordGameActionType,
} from "../../shared/logic/Types";
import { SpellingBeeTile } from "./SpellingBeeTile";
import { shuffle } from "../logic/beeHelpers";
import { WordGameDispatchContext } from "../../shared/logic/Context";

export const SpellingBeeBoard: React.FC<BeeBoardProps> = ({
  centerLetter,
  edgeLetters,
  playing,
}) => {
  const dispatch = useContext(
    WordGameDispatchContext
  ) as Dispatch<WordGameAction>;

  function shuffleEdgeLetters() {
    const newEdgeLetters = shuffle(edgeLetters);
    dispatch({
      type: WordGameActionType.SHUFFLED,
      payload: { edgeLetters: newEdgeLetters },
    });
  }

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
