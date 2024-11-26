import { Dispatch, useReducer } from "react";
import { getViableLetters, initialSpellingBee } from "./logic/beeHelpers.ts";
import {
  PlayerData,
  SpellingBeeGame,
  WordGameAction,
  WordGameActionType,
} from "../shared/logic/Types";
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
import { LANGUAGE } from "../shared/logic/Types.ts";

export const SpellingBee: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, initialSpellingBee) as [
    SpellingBeeGame,
    Dispatch<WordGameAction>
  ];

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
    language?: LANGUAGE,
    players?: string[],
    speedMode?: boolean
  ) {
    if (!language || typeof language !== "string") {
      language = game.language;
    }
    const { centerLetter, edgeLetters } = getViableLetters(language);
    const newGame = {
      ...game,
      language,
      speedMode: speedMode ?? game.speedMode,
      error: "",
      currentPlayer: 0,
      playing: true,
      playersData: players
        ? initializePlayersData(players)
        : game.playersData
            .filter(({ playerName }) => playerName !== "All words")
            .map(({ playerName }) => ({
              playerName,
              wordsFound: [],
              currentScore: 0,
            })),
      centerLetter: centerLetter,
      edgeLetters: edgeLetters,
    };
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload: { game: newGame },
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
