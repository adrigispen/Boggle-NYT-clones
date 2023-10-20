import { useReducer, useRef } from "react";
import { initialSpellingBee, shuffle } from "./logic/beeHelpers.ts";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
import { SearchSection } from "../shared/components/SearchSection";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import { searchForSpellingBeeWord } from "../shared/logic/dictionaryWordCheckService.ts";
import { Header } from "../shared/components/Header.tsx";
import wordGameReducer from "../shared/logic/wordGameReducer.ts";
import { WordGameDispatchContext } from "../shared/logic/Context.ts";

export const SpellingBee: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, initialSpellingBee);
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
      type: WordGameActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
    if (game.speedMode) endTurn();
  }

  function endTurn() {
    const shouldEndGame = isLastPlayer;
    switchPlayerRef.current = setTimeout(() => {
      dispatch({
        type: WordGameActionType.TURN_ENDED,
      });
      if (shouldEndGame) {
        dispatch({
          type: WordGameActionType.GAME_ENDED,
        });
      }
    }, 1000);
  }

  function shuffleLetters() {
    const newEdgeLetters = shuffle(game.edgeLetters);
    dispatch({
      type: WordGameActionType.SHUFFLED,
      payload: { edgeLetters: newEdgeLetters },
    });
  }

  function clearError() {
    dispatch({
      type: WordGameActionType.ERROR_CLEARED,
    });
  }

  const isLastPlayer =
    !game.speedMode && game.currentPlayer == game.playersData.length - 1;

  return (
    <WordGameDispatchContext.Provider value={dispatch}>
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
            clearError={clearError}
          />
          <SpellingBeeBoard
            centerLetter={game.centerLetter}
            edgeLetters={game.edgeLetters}
            shuffleEdgeLetters={shuffleLetters}
            playing={game.playing}
          />
        </div>
        <div className="resultsPanel">
          {game.playing ? (
            <Scoreboard
              playerData={game.playersData[game.currentPlayer]}
              endTurn={endTurn}
            />
          ) : (
            <FinalScores playersData={game.playersData} />
          )}
        </div>
      </div>
    </WordGameDispatchContext.Provider>
  );
};
