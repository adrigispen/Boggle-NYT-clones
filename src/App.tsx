import Settings from "./components/Settings";
import { SettingsModal } from "./components/SettingsModal";
import { Grid } from "./components/Grid";
import { useState } from "react";
import { getNewGrid, findWord, score } from "./helpers";
import { PlayerData } from "./components/Types";
import { Scoreboard } from "./components/Scoreboard";
import { checkWord } from "./services/WordCheckService";
import { SearchSection } from "./components/SearchSection";

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

  const [currentSearch, setCurrentSearch] = useState("");

  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerData, setPlayerData] = useState(initialPlayerData);

  // look for and display words
  async function handleSearch() {
    try {
      const [word] = await checkWord(currentSearch);
      const pathSelectionGrid = findWord(word, grid, settingsData.generousMode);
      if (!pathSelectionGrid.length) {
        setError("Word does not appear on the board!");
        setSelectionGrid(noHighlights);
        setCurrentSearch("");
      } else if (playerData[currentPlayer].wordsFound.indexOf(word) != -1) {
        setError("Already found!");
        setSelectionGrid(noHighlights);
        setCurrentSearch("");
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
                currentScore:
                  playerData[currentPlayer].currentScore + wordScore,
              }
            : data
        );
        setPlayerData(newPlayerData);
        setCurrentSearch("");
      }
    } catch (err) {
      setError(`Not a valid ${settingsData.language} word`);
      setSelectionGrid(noHighlights);
      setCurrentSearch("");
    }
    setCurrentPlayer(
      settingsData.speedMode
        ? (currentPlayer + 1) % settingsData.players.length
        : currentPlayer
    );
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
        <SearchSection
          currentSearch={currentSearch}
          setCurrentSearch={setCurrentSearch}
          handleSearch={handleSearch}
          error={error}
        />
        <Scoreboard {...playerData[currentPlayer]} />
      </div>
    </>
  );
}

export default App;
