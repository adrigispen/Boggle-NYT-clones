import { useReducer } from "react";
import spellingBeeReducer from "./logic/spellingBeeReducer";
import { initialSpellingBee, shuffle } from "./logic/beeHelpers.ts";
import {
  SpellingBeeContext,
  SpellingBeeDispatchContext,
} from "../shared/logic/Context.ts";
import { PlayerData, SpellingBeeActionType } from "../shared/logic/Types";
import { SearchSection } from "../shared/components/SearchSection";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import { searchForSpellingBeeWord } from "../shared/logic/dictionaryWordCheckService.ts";
import { BeeHeader } from "./components/BeeHeader.tsx";

export const SpellingBee: React.FC = () => {
  const [game, dispatch] = useReducer(spellingBeeReducer, initialSpellingBee);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, newPlayerData } = searchForSpellingBeeWord(
      currentSearch,
      game.language,
      playerData,
      game.centerLetter,
      game.edgeLetters
    );
    dispatch({
      type: SpellingBeeActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
  }

  function endTurn() {
    dispatch({
      type: SpellingBeeActionType.TURN_ENDED,
    });
  }

  function shuffleLetters() {
    const newEdgeLetters = shuffle(game.edgeLetters);
    dispatch({
      type: SpellingBeeActionType.SHUFFLE,
      payload: { edgeLetters: newEdgeLetters },
    });
  }

  return (
    <SpellingBeeContext.Provider value={game}>
      <SpellingBeeDispatchContext.Provider value={dispatch}>
        <BeeHeader playing={game.playing} />
        <div className="content">
          <div className="gamePanel">
            <SearchSection
              error={game.error}
              playerData={game.playersData[game.currentPlayer]}
              onSubmit={handleSearch}
              playing={game.playing}
            />
            <SpellingBeeBoard
              centerLetter={game.centerLetter}
              edgeLetters={game.edgeLetters}
              shuffleEdgeLetters={shuffleLetters}
            />
          </div>
          <div className="resultsPanel">
            {game.currentPlayer !== -1 ? (
              <Scoreboard
                playerData={game.playersData[game.currentPlayer]}
                endTurn={endTurn}
              />
            ) : (
              <FinalScores playersData={game.playersData} />
            )}
          </div>
        </div>
      </SpellingBeeDispatchContext.Provider>
    </SpellingBeeContext.Provider>
  );
};
