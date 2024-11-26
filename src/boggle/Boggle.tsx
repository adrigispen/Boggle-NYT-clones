import { Dispatch, useReducer } from "react";
import { defaultGame, getNewGrid, noHighlights } from "./logic/gridHelpers";
import {
  BoggleGame,
  PlayerData,
  WordGameAction,
  WordGameActionType,
} from "../shared/logic/Types";
import {
  WordGameContext,
  WordGameDispatchContext,
} from "../shared/logic/Context";

import {
  findAllWordsOnBoggleBoard,
  searchForWord,
} from "../shared/logic/dictionaryWordCheckService";
import wordGameReducer from "../shared/logic/wordGameReducer";
import { ScoredWordGame } from "../shared/components/ScoredWordGame";
import { Grid } from "./components/Grid";
import { Header } from "../shared/components/Header";
import { initializePlayersData } from "../shared/logic/scoringHelpers";
import { LANGUAGE } from "../shared/logic/Types";

export const Boggle: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, defaultGame) as [
    BoggleGame,
    Dispatch<WordGameAction>
  ];

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, selectionGrid, newPlayerData } = searchForWord(
      currentSearch,
      game.language,
      playerData,
      game.grid,
      game.generousMode
    );
    if (selectionGrid) updateGrid(selectionGrid);
    dispatch({
      type: WordGameActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
  }

  function updateGrid(selectionGrid: boolean[][]) {
    dispatch({
      type: WordGameActionType.BOARD_UPDATED,
      payload: {
        selectionGrid,
      },
    });
  }

  function handleEndGame() {
    dispatch({
      type: WordGameActionType.GAME_ENDED,
      payload: {
        allWords: findAllWordsOnBoggleBoard(
          game.grid,
          game.generousMode,
          game.language
        ),
      },
    });
  }

  function handleStartGame(
    language?: LANGUAGE,
    players?: string[],
    speedMode?: boolean,
    generousMode?: boolean,
    size?: number
  ) {
    if (!language || typeof language !== "string") {
      language = game.language;
    }
    const selectionGrid = noHighlights(size ?? game.size);
    const grid = getNewGrid(size ?? game.size, language);
    let newGame = { ...game };
    newGame = {
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
      size: size ?? game.size,
      generousMode: generousMode ?? game.generousMode,
      grid,
      selectionGrid,
    };
    console.log(newGame);
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload: { game: newGame },
    });
  }

  return (
    <>
      <WordGameContext.Provider value={game}>
        <WordGameDispatchContext.Provider value={dispatch}>
          <Header
            gameName="Speedy Boggle"
            playing={game.playing}
            playerNames={game.playersData.map(({ playerName }) => playerName)}
            onGameStart={handleStartGame}
            onGameEnd={handleEndGame}
          />
          <ScoredWordGame onSearch={handleSearch} onEndGame={handleEndGame}>
            <Grid grid={game.grid} selectionGrid={game.selectionGrid} />
          </ScoredWordGame>
        </WordGameDispatchContext.Provider>
      </WordGameContext.Provider>
    </>
  );
};
