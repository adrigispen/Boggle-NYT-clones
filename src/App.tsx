import "./App.css";
import Settings from "./Components/Settings";
import { Grid } from "./Components/Grid";
import { useState } from "react";
import { getNewGrid, findWord } from "./helpers";

function App() {
  const [settingsData, setSettingsData] = useState({
    players: ["", ""],
    size: 4,
    language: "English",
    generousMode: true,
    speedMode: false,
  });

  const initialGrid: string[][] = getNewGrid(
    settingsData.size,
    settingsData.language
  );

  const [grid, setGrid] = useState(initialGrid);
  const [playerData, setPlayerData] = useState({
    currentSearch: "",
    wordsFound: [""],
  });

  function handleSearch() {
    const path = findWord(playerData.currentSearch, grid);
    if (path.length) {
      const newWords = playerData.wordsFound.concat(playerData.currentSearch);
      setPlayerData({ wordsFound: newWords, currentSearch: "" });
    } else {
      // display "word not on the board!"
      setPlayerData({ ...playerData, currentSearch: "" });
    }
  }

  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <div>
        <h1>Speedy Boggle</h1>
        <Settings
          settingsData={settingsData}
          setSettingsData={setSettingsData}
        />
        <button
          onClick={() =>
            setGrid(getNewGrid(settingsData.size, settingsData.language))
          }
        >
          Play Game
        </button>
        <Grid grid={grid} setGrid={setGrid} />
        <label>
          Search for words
          <input
            name="search"
            value={playerData.currentSearch}
            onChange={(e) =>
              setPlayerData({ ...playerData, currentSearch: e.target.value })
            }
            onKeyDown={(e) => handleEnter(e)}
          />
          <button onClick={handleSearch}>🔎</button>
        </label>
        <div>
          <ul>
            {playerData.wordsFound.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
