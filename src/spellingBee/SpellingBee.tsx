import { useReducer, useRef } from "react";
import spellingBeeReducer from "./logic/spellingBeeReducer";
import { initialSpellingBee, shuffle } from "./logic/beeHelpers.ts";
import { SpellingBeeDispatchContext } from "../shared/logic/Context.ts";
import { PlayerData, SpellingBeeActionType } from "../shared/logic/Types";
import { SearchSection } from "../shared/components/SearchSection";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import { searchForSpellingBeeWord } from "../shared/logic/dictionaryWordCheckService.ts";
import { Header } from "../shared/components/Header.tsx";

export const SpellingBee: React.FC = () => {
  const [game, dispatch] = useReducer(spellingBeeReducer, initialSpellingBee);
  const switchPlayerRef = useRef<number | null>(null);

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
    if (game.speedMode) endTurn();
  }

  function endTurn() {
    switchPlayerRef.current = setTimeout(() => {
      dispatch({
        type: SpellingBeeActionType.TURN_ENDED,
      });
    }, 1000);
  }

  function shuffleLetters() {
    const newEdgeLetters = shuffle(game.edgeLetters);
    dispatch({
      type: SpellingBeeActionType.SHUFFLE,
      payload: { edgeLetters: newEdgeLetters },
    });
  }

  const isLastPlayer =
    !game.speedMode && game.currentPlayer == game.playersData.length - 1;

  return (
    <SpellingBeeDispatchContext.Provider value={dispatch}>
      <Header
        gameName="Spelling Bee"
        playing={game.playing}
        playerNames={game.playersData.map(({ playerName }) => playerName)}
      />
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
            playing={game.playing}
          />
        </div>
        <div className="resultsPanel">
          {game.currentPlayer !== -1 ? (
            <Scoreboard
              playerData={game.playersData[game.currentPlayer]}
              endTurn={endTurn}
              lastPlayer={isLastPlayer}
            />
          ) : (
            <FinalScores playersData={game.playersData} />
          )}
        </div>
      </div>
    </SpellingBeeDispatchContext.Provider>
  );
};
