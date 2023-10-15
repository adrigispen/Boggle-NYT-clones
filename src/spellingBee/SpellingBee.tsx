import { useReducer, useState } from "react";
import spellingBeeReducer from "../logic/spellingBeeReducer";
import {
  initializePlayersData,
  randomSpellingBee,
  searchForSpellingBeeWord,
} from "../logic/helpers";
import { PlayerData, SpellingBeeActionType } from "../components/Types";
import {
  SpellingBeeContext,
  SpellingBeeDispatchContext,
} from "../logic/Context";
import { SettingsModal } from "../components/SettingsModal";
import { SearchSection } from "../components/SearchSection";
import { Scoreboard } from "../components/Scoreboard";
import { FinalScores } from "../components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import SpellingBeeSettings from "./components/SpellingBeeSettings";

export const SpellingBee: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [game, dispatch] = useReducer(spellingBeeReducer, randomSpellingBee);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    searchForSpellingBeeWord(
      currentSearch,
      game.language,
      playerData,
      game.letters
    )
      .then(({ error, playerData }) => {
        dispatch({
          type: SpellingBeeActionType.WORD_SEARCHED,
          payload: {
            error,
            playerData,
          },
        });
      })
      .catch((err) => console.log(err));
  }

  function endTurn() {
    dispatch({
      type: SpellingBeeActionType.TURN_ENDED,
    });
  }

  function handleGameStart(language: string, players: string[]) {
    const playersData = initializePlayersData(players);
    setShowSettings(false);
    dispatch({
      type: SpellingBeeActionType.GAME_STARTED,
      payload: { language, playersData },
    });
  }

  return (
    <SpellingBeeContext.Provider value={game}>
      <SpellingBeeDispatchContext.Provider value={dispatch}>
        <SettingsModal isOpen={showSettings}>
          <SpellingBeeSettings
            handleGameStart={handleGameStart}
            setShowSettings={setShowSettings}
          />
        </SettingsModal>
        <div className="header">
          <h1>
            Spelling Bee
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
            <SpellingBeeBoard />
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
      </SpellingBeeDispatchContext.Provider>
    </SpellingBeeContext.Provider>
  );
};
