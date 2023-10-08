import Settings from "./Components/Settings";
import { SettingsModal } from "./Components/SettingsModal";
import { Grid } from "./Components/Grid";
import { useState } from "react";
import { getNewGrid, findWord } from "./helpers";
import { PlayerData } from "./Components/Types";

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

  // player data state

  const initialPlayerData: PlayerData[] = Array(settingsData.players.length)
    .fill("")
    .map(
      (p, i) =>
        ({
          playerName: settingsData.players[i],
          currentSearch: "",
          wordsFound: [""],
        } as PlayerData)
    );

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerData, setPlayerData] = useState(initialPlayerData);

  // look for and display words
  function setCurrentSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newPlayerData = playerData.map((data, i) =>
      i == currentPlayer ? { ...data, currentSearch: e.target.value } : data
    );
    setPlayerData(newPlayerData);
  }

  function handleSearch() {
    const pathSelectionGrid = findWord(
      playerData[currentPlayer].currentSearch,
      grid,
      settingsData.generousMode
    );
    const newWords = pathSelectionGrid.length
      ? playerData[currentPlayer].wordsFound.concat(
          playerData[currentPlayer].currentSearch
        )
      : playerData[currentPlayer].wordsFound;
    const newPlayerData = playerData.map((data, i) =>
      i == currentPlayer
        ? { ...data, wordsFound: newWords, currentSearch: "" }
        : data
    );
    setPlayerData(newPlayerData);
    if (pathSelectionGrid.length) {
      setSelectionGrid(pathSelectionGrid);
    } else {
      // display "word not on the board!"
    }
    setCurrentPlayer(
      settingsData.speedMode
        ? (currentPlayer + 1) % settingsData.players.length
        : currentPlayer
    );
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  // create new game
  function handleGameStart() {
    setGrid(getNewGrid(settingsData.size, settingsData.language));
    setSelectionGrid(noHighlights);
    setPlayerData(initialPlayerData);
    setShowSettings(false);
  }

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
        <label>
          Search for words
          <input
            name="search"
            value={playerData[currentPlayer].currentSearch}
            onChange={(e) => {
              setCurrentSearch(e);
            }}
            onKeyDown={(e) => handleEnter(e)}
          />
          <button onClick={handleSearch}>🔎</button>
        </label>
        <div>
          <ul>
            {playerData[currentPlayer].wordsFound.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
