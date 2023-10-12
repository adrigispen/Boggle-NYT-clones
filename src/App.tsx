import Settings from "./components/Settings";
import { SettingsModal } from "./components/SettingsModal";
import { Grid } from "./components/Grid";
import { useState } from "react";
import { Scoreboard } from "./components/Scoreboard";
import { SearchSection } from "./components/SearchSection";
import { FinalScores } from "./components/FinalScores";
import {
  defaultGame,
  findWord,
  getNewGrid,
  initializePlayersData,
  noHighlights,
  score,
} from "./helpers";
import { checkWord } from "./services/WordCheckService";

function App() {
  // settings state
  const [showSettings, setShowSettings] = useState(false);
  const [game, setGame] = useState(defaultGame);

  async function handleSearch(currentSearch: string) {
    let error = "";
    let selectionGrid = noHighlights(game.settings.size);
    let newPlayersData = game.playersData;
    const nextPlayer = game.settings.speedMode
      ? (game.currentPlayer + 1) % game.playersData.length
      : game.currentPlayer;
    try {
      const [word] = await checkWord(currentSearch, game.settings.language);
      const pathSelectionGrid = findWord(
        word,
        game.grid,
        game.settings.generousMode
      );
      if (!pathSelectionGrid.length) {
        error = "Word does not appear on the board!";
      } else if (
        game.playersData[game.currentPlayer].wordsFound.indexOf(word) != -1
      ) {
        error = "Already found!";
      } else {
        selectionGrid = pathSelectionGrid;
        newPlayersData = game.playersData.map((data, i) =>
          i == game.currentPlayer
            ? {
                ...data,
                wordsFound: [word].concat(
                  game.playersData[game.currentPlayer].wordsFound
                ),
                currentScore:
                  game.playersData[game.currentPlayer].currentScore +
                  (word.length > 8 ? 11 : (score.get(word.length) as number)),
              }
            : data
        );
      }
    } catch (err) {
      error = `Not a valid ${game.settings.language} word`;
      selectionGrid = noHighlights(game.settings.size);
    }
    setGame({
      ...game,
      playersData: newPlayersData,
      selectionGrid,
      error,
      currentPlayer: nextPlayer,
    });
  }

  function endTurn() {
    const selectionGrid = noHighlights(game.settings.size);
    const error = "";
    const newPlayer = game.settings.speedMode
      ? (game.currentPlayer + 1) % game.playersData.length
      : game.currentPlayer < game.playersData.length - 1
      ? game.currentPlayer + 1
      : -1;
    setGame({
      ...game,
      currentPlayer: newPlayer,
      error: error,
      selectionGrid: selectionGrid,
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
    const grid = getNewGrid(size, language);
    const selectionGrid = noHighlights(size);
    const newGame = {
      settings: {
        size,
        language,
        speedMode,
        generousMode,
      },
      playersData,
      grid,
      selectionGrid,
      currentPlayer: 0,
      error: "",
    };
    setGame(newGame);
    setShowSettings(false);
  }

  console.log("rerendering");
  return (
    <div>
      <h1>Speedy Boggle</h1>
      <button onClick={() => setShowSettings(true)}>Settings</button>
      <SettingsModal isOpen={showSettings}>
        <Settings handleGameStart={handleGameStart} />
      </SettingsModal>
      <Grid grid={game.grid} selectionGrid={game.selectionGrid} />
      <SearchSection onSubmit={handleSearch} error={game.error} />
      {!game.currentPlayer ? (
        <Scoreboard
          {...game.playersData[game.currentPlayer]}
          endTurn={endTurn}
        />
      ) : (
        <FinalScores playerData={game.playersData} />
      )}
    </div>
  );
}

export default App;
