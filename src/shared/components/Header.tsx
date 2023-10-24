import { Dispatch, useContext, useState } from "react";
import { SettingsModal } from "./SettingsModal";
import Settings from "./Settings";
import { initializePlayersData } from "../logic/scoringHelpers";
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

  function handleStart(
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
    setShowSettings(false);
    dispatch({
      type: WordGameActionType.GAME_STARTED,
      payload,
    });
  }

  return (
    <>
      <SettingsModal isOpen={showSettings}>
        <Settings
          gameName={gameName}
          playerNames={playerNames}
          handleGameStart={handleStart}
          setShowSettings={setShowSettings}
        />
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
            <button className="headerBtn" onClick={() => handleStart()}>
              New Game
            </button>
          )}
        </h1>
      </div>
    </>
  );
};
