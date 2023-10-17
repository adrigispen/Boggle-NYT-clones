import { useReducer, useState } from "react";
import boggleReducer from "./logic/boggleReducer";
import { defaultGame, noHighlights } from "./logic/gridHelpers";
import { BoggleActionType, PlayerData } from "../shared/logic/Types";
import { BoggleContext, BoggleDispatchContext } from "./logic/Context";
import { SettingsModal } from "../shared/components/SettingsModal";
import Settings from "./components/Settings";
import { SearchSection } from "../shared/components/SearchSection";
import { Grid } from "./components/Grid";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { initializePlayersData } from "../shared/logic/scoringHelpers";
import { searchForWord } from "../shared/logic/dictionaryWordCheckService";

export const Boggle: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [game, dispatch] = useReducer(boggleReducer, defaultGame);

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
        selectionGrid: selectionGrid ?? noHighlights(game.settings.size),
        playerData: newPlayerData ?? playerData,
      },
    });
  }

  function endTurn() {
    dispatch({
      type: BoggleActionType.TURN_ENDED,
    });
  }

  function handleGameStart(
    size: number,
    language: string,
    players: string[],
    speedMode: boolean,
    generousMode: boolean
  ) {
    const playersData = initializePlayersData(players);
    setShowSettings(false);
    dispatch({
      type: BoggleActionType.GAME_STARTED,
      payload: { size, language, speedMode, generousMode, playersData },
    });
  }

  function clearHighlightAndRotateIfSpeedMode() {
    dispatch({
      type: BoggleActionType.HIGHLIGHT_CLEARED,
    });
    if (game.settings.speedMode) endTurn();
  }

  return (
    <>
      <BoggleContext.Provider value={game}>
        <BoggleDispatchContext.Provider value={dispatch}>
          <SettingsModal isOpen={showSettings}>
            <Settings
              handleGameStart={handleGameStart}
              setShowSettings={setShowSettings}
            />
          </SettingsModal>
          <div className="header">
            <h1>
              Speedy Boggle
              <button
                className="openSettings"
                onClick={() => setShowSettings(true)}
              >
                ⚙️
              </button>
            </h1>
          </div>
          <div className="content">
            <div className="gamePanel">
              <SearchSection
                error={game.error}
                playerData={game.playersData[game.currentPlayer]}
                onSubmit={handleSearch}
              />
              <Grid
                grid={game.grid}
                selectionGrid={game.selectionGrid}
                clearHighlight={clearHighlightAndRotateIfSpeedMode}
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
        </BoggleDispatchContext.Provider>
      </BoggleContext.Provider>
    </>
  );
};
