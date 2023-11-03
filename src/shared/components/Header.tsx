import { useState } from "react";
import { SettingsModal } from "./SettingsModal";
import Settings from "./Settings";

export const Header: React.FC<{
  gameName: string;
  playing: boolean;
  playerNames: string[];
  onGameStart: () => void;
  onGameEnd: () => void;
}> = ({ gameName, playing, playerNames, onGameStart, onGameEnd }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <SettingsModal isOpen={showSettings}>
        <Settings
          gameName={gameName}
          playerNames={playerNames}
          onGameStart={onGameStart}
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
            <button
              className="headerBtn"
              onClick={onGameEnd}
              disabled={!playing}
            >
              End Game
            </button>
          ) : (
            <button className="headerBtn" onClick={onGameStart}>
              New Game
            </button>
          )}
        </h1>
      </div>
    </>
  );
};
