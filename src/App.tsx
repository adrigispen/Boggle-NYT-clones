import Settings from "./components/Settings";
import { SettingsModal } from "./components/SettingsModal";
import { Grid } from "./components/Grid";
import { useReducer, useState } from "react";
import { Scoreboard } from "./components/Scoreboard";
import { SearchSection } from "./components/SearchSection";
import { FinalScores } from "./components/FinalScores";
import {
  defaultGame,
  initializePlayersData,
  searchForWord,
} from "./logic/helpers";
import boggleReducer from "./logic/boggleReducer";
import { BoggleActionType, PlayerData } from "./components/Types";
import { BoggleContext, BoggleDispatchContext } from "./logic/BoggleContext";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [game, dispatch] = useReducer(boggleReducer, defaultGame);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    searchForWord(
      currentSearch,
      game.settings.language,
      playerData,
      game.grid,
      game.settings.generousMode
    )
      .then(({ selectionGrid, error, playerData }) => {
        dispatch({
          type: BoggleActionType.WORD_SEARCHED,
          payload: {
            selectionGrid,
            error,
            playerData,
          },
        });
        // doesn't display the word - this action is too fast, resets the board to noHighlights
        if (game.settings.speedMode) {
          dispatch({
            type: BoggleActionType.TURN_ENDED,
          });
        }
      })
      .catch((err) => console.log(err));
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

  return (
    <BoggleContext.Provider value={game}>
      <BoggleDispatchContext.Provider value={dispatch}>
        <h1>Speedy Boggle</h1>
        <button onClick={() => setShowSettings(true)}>Settings</button>
        <SettingsModal isOpen={showSettings}>
          <Settings handleGameStart={handleGameStart} />
        </SettingsModal>
        <Grid />
        <SearchSection onSubmit={handleSearch} />
        {game.currentPlayer !== -1 ? (
          <Scoreboard endTurn={endTurn} />
        ) : (
          <FinalScores />
        )}
      </BoggleDispatchContext.Provider>
    </BoggleContext.Provider>
  );
}

export default App;
