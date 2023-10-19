import { Dispatch, useContext, useState } from "react";
import { SettingsModal } from "./SettingsModal";
import Settings from "../../boggle/components/Settings";
import { initializePlayersData } from "../logic/scoringHelpers";
import { BoggleAction, BoggleActionType, BoggleGame } from "../logic/Types";
import {
  BoggleContext,
  BoggleDispatchContext,
} from "../../boggle/logic/Context";

export const Header: React.FC<{ playing: boolean }> = ({ playing }) => {
  const [showSettings, setShowSettings] = useState(false);
  const game = useContext(BoggleContext) as BoggleGame;
  const dispatch = useContext(BoggleDispatchContext) as Dispatch<BoggleAction>;

  function endGame() {
    dispatch({
      type: BoggleActionType.GAME_ENDED,
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
    <>
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
          {playing ? (
            <button className="headerBtn" onClick={endGame} disabled={!playing}>
              End Game
            </button>
          ) : (
            <button
              className="headerBtn"
              onClick={() =>
                handleGameStart(
                  game.settings.size,
                  game.settings.language,
                  game.playersData
                    .filter(({ playerName }) => playerName != "BoggleBot")
                    .map(({ playerName }) => playerName),
                  game.settings.speedMode,
                  game.settings.generousMode
                )
              }
            >
              New Game
            </button>
          )}
        </h1>
      </div>
    </>
  );
};
