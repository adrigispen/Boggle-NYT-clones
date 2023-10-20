import { Dispatch, useContext, useState } from "react";
import { SettingsModal } from "./SettingsModal";
import Settings from "../../boggle/components/Settings";
import { initializePlayersData } from "../logic/scoringHelpers";
import SpellingBeeSettings from "../../spellingBee/components/SpellingBeeSettings";
import { WordGameDispatchContext } from "../logic/Context";
import { WordGameAction, WordGameActionType } from "../logic/Types";

export const Header: React.FC<{
  gameName: string;
  playing: boolean;
  playerNames: string[];
}> = ({ gameName, playing, playerNames }) => {
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useContext(
    WordGameDispatchContext
  ) as Dispatch<WordGameAction>;

  function endGame() {
    dispatch({
      type: WordGameActionType.GAME_ENDED,
    });
  }

  function handleBoggleStart(
    size?: number,
    language?: string,
    players?: string[],
    speedMode?: boolean,
    generousMode?: boolean
  ) {
    let payload = {};
    if (players) {
      const playersData = initializePlayersData(players);
      payload = { size, language, speedMode, generousMode, playersData };
    }
    setShowSettings(false);
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload,
    });
  }

  function handleBeeStart(
    language?: string,
    players?: string[],
    speedMode?: boolean
  ) {
    let payload = {};
    if (players) {
      const playersData = initializePlayersData(players);
      payload = { language, playersData, speedMode };
    }
    setShowSettings(false);
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload,
    });
  }

  return (
    <>
      <SettingsModal isOpen={showSettings}>
        {gameName === "Speedy Boggle" ? (
          <Settings
            playerNames={playerNames}
            handleGameStart={handleBoggleStart}
            setShowSettings={setShowSettings}
          />
        ) : (
          <SpellingBeeSettings
            playerNames={playerNames}
            handleGameStart={handleBeeStart}
            setShowSettings={setShowSettings}
          />
        )}
      </SettingsModal>
      <div className="header">
        <h1>
          {gameName}
          <button
            className="openSettings"
            onClick={() => setShowSettings(true)}
          >
            ⚙️
          </button>
          {playing ? (
            <button className="headerBtn" onClick={endGame} disabled={!playing}>
              End Game
            </button>
          ) : (
            <button
              className="headerBtn"
              onClick={() => {
                gameName === "Speedy Boggle"
                  ? handleBoggleStart()
                  : handleBeeStart();
              }}
            >
              New Game
            </button>
          )}
        </h1>
      </div>
    </>
  );
};
