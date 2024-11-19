import { useState } from "react";
import { Header } from "../shared/components/Header";
import { WordleBoard } from "./components/WordleBoard";
import { defaultGame, getWordleWord, isLegalWord } from "./logic/helpers.ts";

export const Wordle: React.FC = () => {
  const [game, setGame] = useState(defaultGame);

  function handleGuess(guess: string, attempt: number) {
    const newGrid = game.grid;
    let newError = "";
    let newPlayersData = game.playersData;
    if (isLegalWord(guess)) {
      newGrid[attempt] = [...guess];
      newPlayersData = game.playersData.map((playerData, i) =>
        i === game.currentPlayer
          ? {
              ...playerData,
              wordsFound: game.playersData[i].wordsFound.concat(guess),
            }
          : playerData
      );
    } else {
      newError = "Invalid attempt!";
    }
    const newGame = {
      ...game,
      error: newError,
      grid: newGrid,
      playersData: newPlayersData,
    };
    setGame(newGame);
    if (
      game.answer === guess.toUpperCase() ||
      game.playersData[0].wordsFound.length === 6
    ) {
      handleGameEnd();
    }
  }

  function handleStartGame() {
    const grid = [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    const answer = getWordleWord();
    const newGame = { ...defaultGame, grid, answer };
    setGame(newGame);
  }
  function handleGameEnd() {
    setGame({ ...game, playing: false });
    alert(`Game over! ${game.answer}`);
  }

  return (
    <>
      <Header
        gameName="Wordle"
        playerNames={[""]}
        playing={game.playing}
        onGameStart={handleStartGame}
        onGameEnd={handleGameEnd}
      />
      <div className="content">
        <div className="gamePanel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGuess(
                e.currentTarget.search.value,
                game.playersData[game.currentPlayer].wordsFound.length
              );
              e.currentTarget.reset();
            }}
          >
            <div className="search">
              <input
                className="searchBar"
                name="search"
                disabled={!game.playing}
              />
              <button
                className="searchBtn"
                type="submit"
                disabled={!game.playing}
              >
                🔎
              </button>
            </div>
          </form>
          <div>
            {game.error && <label className="error">{game.error}</label>}
          </div>
          <WordleBoard grid={game.grid} answer={game.answer} />
        </div>
      </div>
    </>
  );
};
