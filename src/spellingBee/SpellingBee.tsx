import { useReducer, useState } from "react";
import spellingBeeReducer from "./logic/spellingBeeReducer";
import {
  getNewLetters,
  randomSpellingBee,
  shuffle,
} from "./logic/beeHelpers.ts";

import { PlayerData, SpellingBeeActionType } from "../shared/logic/Types";
import { SettingsModal } from "../shared/components/SettingsModal";
import { SearchSection } from "../shared/components/SearchSection";
import { Scoreboard } from "../shared/components/Scoreboard";
import { FinalScores } from "../shared/components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import SpellingBeeSettings from "./components/SpellingBeeSettings";
import { initializePlayersData } from "../shared/logic/scoringHelpers.ts";
import { searchForSpellingBeeWord } from "../shared/logic/dictionaryWordCheckService.ts";

export const SpellingBee: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const randomBee = randomSpellingBee();
  const [game, dispatch] = useReducer(spellingBeeReducer, randomBee);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    const { error, newPlayerData } = searchForSpellingBeeWord(
      currentSearch,
      game.language,
      playerData,
      game.centerLetter,
      game.edgeLetters
    );
    dispatch({
      type: SpellingBeeActionType.WORD_SEARCHED,
      payload: {
        error,
        playerData: newPlayerData ?? playerData,
      },
    });
  }

  function endTurn() {
    dispatch({
      type: SpellingBeeActionType.TURN_ENDED,
    });
  }

  function endGame() {
    dispatch({
      type: SpellingBeeActionType.GAME_ENDED,
    });
  }

  function handleGameStart(language: string, players: string[]) {
    const playersData = initializePlayersData(players);
    const { centerLetter, edgeLetters } = getNewLetters(language);
    setShowSettings(false);
    dispatch({
      type: SpellingBeeActionType.GAME_STARTED,
      payload: { language, playersData, centerLetter, edgeLetters },
    });
  }

  function getNewBoard() {
    const { centerLetter, edgeLetters } = getNewLetters(game.language);
    const playersData = game.playing
      ? game.playersData
      : initializePlayersData(
          game.playersData
            .map(({ playerName }) => playerName)
            .filter((p) => p !== "SpellingBeeBot")
        );
    dispatch({
      type: SpellingBeeActionType.GAME_STARTED,
      payload: { ...game, playersData, centerLetter, edgeLetters },
    });
  }

  function shuffleLetters() {
    const newEdgeLetters = shuffle(game.edgeLetters);
    dispatch({
      type: SpellingBeeActionType.SHUFFLE,
      payload: { edgeLetters: newEdgeLetters },
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
          <button className="headerBtn" onClick={endGame}>
            End Game
          </button>
        </h1>
      </div>
      <div className="content">
        <div className="gamePanel">
          <SearchSection
            error={game.error}
            playerData={game.playersData[game.currentPlayer]}
            onSubmit={handleSearch}
            playing={game.playing}
          />
          <SpellingBeeBoard
            centerLetter={game.centerLetter}
            edgeLetters={game.edgeLetters}
            shuffleEdgeLetters={shuffleLetters}
            getNewBoard={getNewBoard}
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
    </>
  );
};
