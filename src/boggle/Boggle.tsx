import { useReducer } from "react";
import { defaultGame } from "./logic/gridHelpers";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
import {
  WordGameContext,
  WordGameDispatchContext,
} from "../shared/logic/Context";

import { searchForWord } from "../shared/logic/dictionaryWordCheckService";
import wordGameReducer from "../shared/logic/wordGameReducer";
import { ScoredWordGame } from "../shared/components/ScoredWordGame";
import { Grid } from "./components/Grid";

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

  return (
    <>
      <WordGameContext.Provider value={game}>
        <WordGameDispatchContext.Provider value={dispatch}>
          <ScoredWordGame handleSearch={handleSearch} gameName="Speedy Boggle">
            <Grid grid={game.grid} selectionGrid={game.selectionGrid} />
          </ScoredWordGame>
        </WordGameDispatchContext.Provider>
      </WordGameContext.Provider>
    </>
  );
};
