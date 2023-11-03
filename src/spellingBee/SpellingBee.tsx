import { useReducer } from "react";
import { initialSpellingBee } from "./logic/beeHelpers.ts";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
import {
  findAllSpellingBeeWords,
  searchForSpellingBeeWord,
} from "../shared/logic/dictionaryWordCheckService.ts";
import wordGameReducer from "../shared/logic/wordGameReducer.ts";
import {
  WordGameContext,
  WordGameDispatchContext,
} from "../shared/logic/Context.ts";
import { ScoredWordGame } from "../shared/components/ScoredWordGame.tsx";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard.tsx";
import { Header } from "../shared/components/Header.tsx";
import { initializePlayersData } from "../shared/logic/scoringHelpers.ts";

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

  function handleEndGame() {
    dispatch({
      type: WordGameActionType.GAME_ENDED,
      payload: {
        allWords: findAllSpellingBeeWords(
          game.language,
          game.centerLetter,
          game.edgeLetters
        ),
      },
    });
  }

  function handleStartGame(
    language?: string,
    players?: string[],
    speedMode?: boolean
  ) {
    let payload = {};
    if (players) {
      const playersData = initializePlayersData(players);
      payload = { language, playersData, speedMode };
    }
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload,
    });
  }

  return (
    <WordGameContext.Provider value={game}>
      <WordGameDispatchContext.Provider value={dispatch}>
        <Header
          gameName="Spelling Bee"
          playing={game.playing}
          playerNames={game.playersData.map(({ playerName }) => playerName)}
          onGameStart={handleStartGame}
          onGameEnd={handleEndGame}
        />
        <ScoredWordGame onSearch={handleSearch} onEndGame={handleEndGame}>
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
