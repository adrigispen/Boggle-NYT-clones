import { useReducer } from "react";
import { defaultGame } from "./logic/gridHelpers";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
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

export const Boggle: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, defaultGame);

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
    language?: string,
    players?: string[],
    speedMode?: boolean,
    generousMode?: boolean,
    size?: number
  ) {
    let payload = {};
    if (players) {
      const playersData = initializePlayersData(players);
      payload = size
        ? { size, language, speedMode, generousMode, playersData }
        : { language, playersData, speedMode };
    }
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload,
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
