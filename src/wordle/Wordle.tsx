import { useState } from "react";
import { Header } from "../shared/components/Header";
import { WordleBoard } from "./components/WordleBoard";
import { defaultGame, getWordleWord, isLegalWord } from "./logic/helpers.ts";

export const Wordle: React.FC = () => {
  const [game, setGame] = useState(defaultGame);
  const [error, setError] = useState("");

  function handleGuess(guess: string, attempt: number) {
    const newGrid = game.grid;
    let newPlayerData = game.playerData;
    if (isLegalWord(guess)) {
      newGrid[attempt] = [...guess];
      newPlayerData = {
        ...game.playerData,
        wordsFound: game.playerData.wordsFound.concat(guess),
      };
    } else {
      setError("Invalid attempt!");
    }
    const newGame = {
      ...game,
      grid: newGrid,
      playerData: newPlayerData,
    };
    setGame(newGame);
    if (
      game.answer === guess.toUpperCase() ||
      game.playerData.wordsFound.length === 5
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
    setTimeout(displayAnswer, 1000);
  }

  function displayAnswer() {
    alert(`Game over! ${game.answer}`);
  }

  function clearError() {
    setError("");
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
                e.currentTarget.search.value.toUpperCase(),
                game.playerData.wordsFound.length
              );
              e.currentTarget.reset();
              setTimeout(clearError, 1000);
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
          <div>{error && <label className="error">{error}</label>}</div>
          <WordleBoard grid={game.grid} answer={game.answer} />
        </div>
      </div>
    </>
  );
};
