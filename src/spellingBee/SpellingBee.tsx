import { useReducer, useState } from "react";
import spellingBeeReducer from "../logic/spellingBeeReducer";
import {
  getNewLetters,
  initializePlayersData,
  randomSpellingBee,
  searchForSpellingBeeWord,
  shuffle,
} from "../logic/helpers";
import { PlayerData, SpellingBeeActionType } from "../components/Types";
import { SettingsModal } from "../components/SettingsModal";
import { SearchSection } from "../components/SearchSection";
import { Scoreboard } from "../components/Scoreboard";
import { FinalScores } from "../components/FinalScores";
import { SpellingBeeBoard } from "./components/SpellingBeeBoard";
import SpellingBeeSettings from "./components/SpellingBeeSettings";

export const SpellingBee: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const randomBee = randomSpellingBee();
  const [game, dispatch] = useReducer(spellingBeeReducer, randomBee);

  function handleSearch(currentSearch: string, playerData: PlayerData) {
    searchForSpellingBeeWord(
      currentSearch,
      game.language,
      playerData,
      game.centerLetter,
      game.edgeLetters
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
    const { centerLetter, edgeLetters } = getNewLetters(language);
    setShowSettings(false);
    dispatch({
      type: SpellingBeeActionType.GAME_STARTED,
      payload: { language, playersData, centerLetter, edgeLetters },
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
        </h1>
      </div>
      <div className="content">
        <div className="gamePanel">
          <SearchSection
            error={game.error}
            playerData={game.playersData[game.currentPlayer]}
            onSubmit={handleSearch}
          />
          <SpellingBeeBoard
            centerLetter={game.centerLetter}
            edgeLetters={game.edgeLetters}
            shuffleEdgeLetters={shuffleLetters}
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
