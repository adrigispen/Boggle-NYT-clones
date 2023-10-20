import { Dispatch, useContext, useState } from "react";
import { SettingsModal } from "../../shared/components/SettingsModal";
import SpellingBeeSettings from "./SpellingBeeSettings";
import {
  SpellingBeeAction,
  SpellingBeeActionType,
  SpellingBeeGame,
} from "../../shared/logic/Types";
import {
  SpellingBeeContext,
  SpellingBeeDispatchContext,
} from "../../shared/logic/Context";
import { initializePlayersData } from "../../shared/logic/scoringHelpers";
import { getViableLetters } from "../logic/beeHelpers";

export const BeeHeader: React.FC<{ playing: boolean }> = ({ playing }) => {
  const [showSettings, setShowSettings] = useState(false);
  const game = useContext(SpellingBeeContext) as SpellingBeeGame;
  const dispatch = useContext(
    SpellingBeeDispatchContext
  ) as Dispatch<SpellingBeeAction>;

  function endGame() {
    dispatch({
      type: SpellingBeeActionType.GAME_ENDED,
    });
  }

  function handleGameStart(
    language: string,
    players: string[],
    speedMode: boolean
  ) {
    const playersData = initializePlayersData(players);
    setShowSettings(false);
    const { centerLetter, edgeLetters } = getViableLetters(language);
    dispatch({
      type: SpellingBeeActionType.GAME_STARTED,
      payload: { language, playersData, centerLetter, edgeLetters, speedMode },
    });
  }

  return (
    <>
      <SettingsModal isOpen={showSettings}>
        <SpellingBeeSettings
          playerNames={game.playersData.map(({ playerName }) => playerName)}
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
          {playing ? (
            <button className="headerBtn" onClick={endGame} disabled={!playing}>
              End Game
            </button>
          ) : (
            <button
              className="headerBtn"
              onClick={() =>
                handleGameStart(
                  game.language,
                  game.playersData
                    .filter(({ playerName }) => playerName != "BoggleBot")
                    .map(({ playerName }) => playerName),
                  game.speedMode
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
