import Settings from "./components/Settings";
import { SettingsModal } from "./components/SettingsModal";
import { Grid } from "./components/Grid";
import { useState } from "react";
import { getNewGrid, findWord, score } from "./helpers";
import { PlayerData } from "./components/Types";
import { Scoreboard } from "./components/Scoreboard";
import { checkWord } from "./services/WordCheckService";
import { SearchSection } from "./components/SearchSection";
import { FinalScores } from "./components/FinalScores";

function App() {
  // settings state
  const [showSettings, setShowSettings] = useState(false);

  const [settingsData, setSettingsData] = useState({
    players: ["Player 1", "Player 2"],
    size: 4,
    language: "English",
    generousMode: true,
    speedMode: false,
  });

  // grid and selection state
  const initialGrid: string[][] = getNewGrid(
    settingsData.size,
    settingsData.language
  );

  const noHighlights: boolean[][] = Array(settingsData.size)
    .fill(false)
    .map(() => Array(settingsData.size).fill(false));

  const [selectionGrid, setSelectionGrid] = useState(noHighlights);

  const [grid, setGrid] = useState(initialGrid);
  const [error, setError] = useState("");

  // player data state
  const initialPlayerData: PlayerData[] = Array(settingsData.players.length)
    .fill("")
    .map(
      (p, i) =>
        ({
          playerName: settingsData.players[i],
          wordsFound: [""],
          currentScore: 0,
        } as PlayerData)
    );

  //const [currentSearch, setCurrentSearch] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerData, setPlayerData] = useState(initialPlayerData);

  // game state
  const [gameOver, setGameOver] = useState(false);

  // look for and display words
  // needs: currentSearch, selectionGrid, settingsData, grid, error, playerData
  // could use dispatchers and observers - useReducer & useContext
  // useMemo, useCallback - could cache functions
  // use components only for display, try to pull out all the logic into a reducer game service
  async function handleSearch(currentSearch: string) {
    try {
      const [word] = await checkWord(currentSearch, settingsData.language);
      const pathSelectionGrid = findWord(word, grid, settingsData.generousMode);
      if (!pathSelectionGrid.length) {
        clearAndShowError("Word does not appear on the board!");
      } else if (playerData[currentPlayer].wordsFound.indexOf(word) != -1) {
        clearAndShowError("Already found!");
      } else {
        setError("");
        setSelectionGrid(pathSelectionGrid);
        const newPlayerData = playerData.map((data, i) =>
          i == currentPlayer
            ? {
                ...data,
                wordsFound: [word].concat(playerData[currentPlayer].wordsFound),
                currentScore:
                  playerData[currentPlayer].currentScore +
                  (word.length > 8 ? 11 : (score.get(word.length) as number)),
              }
            : data
        );
        setPlayerData(newPlayerData);
      }
    } catch (err) {
      clearAndShowError(`Not a valid ${settingsData.language} word`);
    }
    setCurrentPlayer(
      settingsData.speedMode
        ? (currentPlayer + 1) % settingsData.players.length
        : currentPlayer
    );
  }

  function clearAndShowError(error: string) {
    setError(error);
    setSelectionGrid(noHighlights);
  }

  // end turn or game
  function endTurn() {
    if (settingsData.speedMode) {
      setCurrentPlayer((currentPlayer + 1) % settingsData.players.length);
      setSelectionGrid(noHighlights);
      setError("");
    } else {
      if (currentPlayer < settingsData.players.length - 1) {
        setCurrentPlayer(currentPlayer + 1);
        setSelectionGrid(noHighlights);
        setError("");
      } else {
        setGameOver(true);
        setSelectionGrid(noHighlights);
        setError("");
      }
    }
  }

  // create new game
  function handleGameStart() {
    setGrid(getNewGrid(settingsData.size, settingsData.language));
    setSelectionGrid(noHighlights);
    setPlayerData(initialPlayerData);
    setShowSettings(false);
  }
  console.log("rerendering");
  return (
    <>
      <div>
        <h1>Speedy Boggle</h1>
        <button onClick={() => setShowSettings(true)}>Settings</button>
        <SettingsModal isOpen={showSettings}>
          <Settings
            settingsData={settingsData}
            setSettingsData={setSettingsData}
          />
          <button onClick={handleGameStart}>Play Game</button>
        </SettingsModal>
        <Grid
          grid={grid}
          setGrid={setGrid}
          selectionGrid={selectionGrid}
          setSelectionGrid={setSelectionGrid}
        />
        <SearchSection onSubmit={handleSearch} error={error} />
        {!gameOver ? (
          <Scoreboard {...playerData[currentPlayer]} endTurn={endTurn} />
        ) : (
          <FinalScores playerData={playerData} />
        )}
      </div>
    </>
  );
}

export default App;
