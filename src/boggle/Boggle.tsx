import { useReducer, useRef } from "react";
import boggleReducer from "./logic/boggleReducer";
import { defaultGame } from "./logic/gridHelpers";
import { BoggleActionType, PlayerData } from "../shared/logic/Types";
import { BoggleContext, BoggleDispatchContext } from "../shared/logic/Context";
import { SearchSection } from "../shared/components/SearchSection";
import { Grid } from "./components/Grid";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { searchForWord } from "../shared/logic/dictionaryWordCheckService";
import { Header } from "../shared/components/Header";

export const Boggle: React.FC = () => {
  const [game, dispatch] = useReducer(boggleReducer, defaultGame);
  const switchPlayerRef = useRef<number | null>(null);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, selectionGrid, newPlayerData } = searchForWord(
      currentSearch,
      game.settings.language,
      playerData,
      game.grid,
      game.settings.generousMode
    );
    dispatch({
      type: BoggleActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
    if (selectionGrid) updateGrid(selectionGrid);
    if (game.settings.speedMode) endTurn();
  }

  function endTurn() {
    switchPlayerRef.current = setTimeout(() => {
      dispatch({
        type: BoggleActionType.TURN_ENDED,
      });
      if (!game.playing) endGame();
    }, 1000);
  }

  function endGame() {
    dispatch({
      type: BoggleActionType.GAME_ENDED,
    });
  }

  function updateGrid(selectionGrid: boolean[][]) {
    dispatch({
      type: BoggleActionType.GRID_UPDATED,
      payload: {
        selectionGrid,
      },
    });
  }

  return (
    <>
      <BoggleContext.Provider value={game}>
        <BoggleDispatchContext.Provider value={dispatch}>
          <Header playing={game.playing} />

          <div className="content">
            <div className="gamePanel">
              <SearchSection
                error={game.error}
                playerData={game.playersData[game.currentPlayer]}
                onSubmit={handleSearch}
                playing={game.playing}
              />
              <Grid
                grid={game.grid}
                selectionGrid={game.selectionGrid}
                updateGrid={updateGrid}
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
        </BoggleDispatchContext.Provider>
      </BoggleContext.Provider>
    </>
  );
};
