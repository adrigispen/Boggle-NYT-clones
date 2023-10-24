import { useReducer } from "react";
import { initialSpellingBee } from "./logic/beeHelpers.ts";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
import { searchForSpellingBeeWord } from "../shared/logic/dictionaryWordCheckService.ts";
import wordGameReducer from "../shared/logic/wordGameReducer.ts";
import {
  WordGameContext,
  WordGameDispatchContext,
} from "../shared/logic/Context.ts";
import { ScoredWordGame } from "../shared/components/ScoredWordGame.tsx";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard.tsx";

export const SpellingBee: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, initialSpellingBee);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, newPlayerData } = searchForSpellingBeeWord(
      currentSearch,
      game.language,
      playerData,
      game.centerLetter,
      game.edgeLetters
    );
    dispatch({
      type: WordGameActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
  }

  return (
    <WordGameContext.Provider value={game}>
      <WordGameDispatchContext.Provider value={dispatch}>
        <ScoredWordGame handleSearch={handleSearch} gameName="Spelling Bee">
          <SpellingBeeBoard
            centerLetter={game.centerLetter}
            edgeLetters={game.edgeLetters}
            playing={game.playing}
          />
        </ScoredWordGame>
      </WordGameDispatchContext.Provider>
    </WordGameContext.Provider>
  );
};
