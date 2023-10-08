import Settings from "./components/Settings";
import { SettingsModal } from "./components/SettingsModal";
import { Grid } from "./components/Grid";
import { useState } from "react";
import { getNewGrid, findWord, score } from "./helpers";
import { PlayerData } from "./components/Types";
import { Scoreboard } from "./components/Scoreboard";
import { checkWord } from "./services/WordCheckService";

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
          currentSearch: "",
          wordsFound: [""],
          currentScore: 0,
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

  async function handleSearch() {
    const clearedSearchPlayerData = playerData.map((d, i) =>
      i == currentPlayer ? { ...d, currentSearch: "" } : d
    );
    try {
      const [word] = await checkWord(playerData[currentPlayer].currentSearch);
      const pathSelectionGrid = findWord(word, grid, settingsData.generousMode);
      if (!pathSelectionGrid.length) {
        setError("Word does not appear on the board!");
        setSelectionGrid(noHighlights);
        setPlayerData(clearedSearchPlayerData);
      } else if (playerData[currentPlayer].wordsFound.indexOf(word) != -1) {
        setError("Already found!");
        setSelectionGrid(noHighlights);
        setPlayerData(clearedSearchPlayerData);
      } else {
        setError("");
        setSelectionGrid(pathSelectionGrid);
        const newWords = [word].concat(playerData[currentPlayer].wordsFound);
        const wordScore =
          word.length > 8 ? 11 : (score.get(word.length) as number);
        const newPlayerData = playerData.map((data, i) =>
          i == currentPlayer
            ? {
                ...data,
                wordsFound: newWords,
                currentSearch: "",
                currentScore:
                  playerData[currentPlayer].currentScore + wordScore,
              }
            : data
        );
        setPlayerData(newPlayerData);
      }
    } catch (err) {
      setError(`Not a valid ${settingsData.language} word`);
      setSelectionGrid(noHighlights);
      setPlayerData(clearedSearchPlayerData);
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
        {error && <label className="error">{error}</label>}
        <Scoreboard {...playerData[currentPlayer]} />
      </div>
    </>
  );
}

export default App;
