import { useReducer, useRef } from "react";
import { defaultGame } from "./logic/gridHelpers";
import { PlayerData, WordGameActionType } from "../shared/logic/Types";
import { WordGameDispatchContext } from "../shared/logic/Context";
import { SearchSection } from "../shared/components/SearchSection";
import { Grid } from "./components/Grid";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { searchForWord } from "../shared/logic/dictionaryWordCheckService";
import { Header } from "../shared/components/Header";
import wordGameReducer from "../shared/logic/wordGameReducer";

export const Boggle: React.FC = () => {
  const [game, dispatch] = useReducer(wordGameReducer, defaultGame);
  const switchPlayerRef = useRef<number | null>(null);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, selectionGrid, newPlayerData } = searchForWord(
      currentSearch,
      game.language,
      playerData,
      game.grid,
      game.generousMode
    );
    dispatch({
      type: WordGameActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
    if (selectionGrid) updateGrid(selectionGrid);
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

  function updateGrid(selectionGrid: boolean[][]) {
    dispatch({
      type: WordGameActionType.BOARD_UPDATED,
      payload: {
        selectionGrid,
      },
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
    <>
      <WordGameDispatchContext.Provider value={dispatch}>
        <Header
          gameName="Speedy Boggle"
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
      </WordGameDispatchContext.Provider>
    </>
  );
};
