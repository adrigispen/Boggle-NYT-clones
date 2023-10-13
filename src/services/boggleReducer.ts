import {
  BoggleGame,
  BoggleAction,
  BoggleActionType,
} from "../components/Types";
import { findWords } from "../findAllWords";
import { calculateWinner, getNewGrid, noHighlights, score } from "../helpers";

export default function boggleReducer(game: BoggleGame, action: BoggleAction) {
  switch (action.type) {
    case BoggleActionType.GAME_STARTED: {
      const selectionGrid = Array(action.payload.size)
        .fill(false)
        .map(() => Array(action.payload.size).fill(false));
      const grid = getNewGrid(action.payload.size, action.payload.language);
      return {
        ...game,
        settings: {
          size: action.payload.size,
          language: action.payload.language,
          speedMode: action.payload.speedMode,
          generousMode: action.payload.generousMode,
        },
        playersData: action.payload.playersData,
        grid: grid,
        selectionGrid: selectionGrid,
        currentPlayer: 0,
      };
    }
    case BoggleActionType.WORD_SEARCHED: {
      const { playerData, selectionGrid, error } = action.payload;
      const playersData = game.playersData.map((data) =>
        data.playerName == playerData.playerName ? playerData : data
      );
      return {
        ...game,
        playersData,
        selectionGrid,
        error,
      };
    }
    case BoggleActionType.TURN_ENDED: {
      let playersData = game.playersData;
      const selectionGrid = noHighlights(game.settings.size);
      const error = "";
      const newPlayer = game.settings.speedMode
        ? (game.currentPlayer + 1) % game.playersData.length
        : game.currentPlayer < game.playersData.length - 1
        ? game.currentPlayer + 1
        : -1;
      const playing = newPlayer == -1 ? false : true;
      if (!playing) {
        const allWords = findWords(game.grid);
        const bestScore = allWords.reduce(
          (acc, cv) =>
            acc + (cv.length > 8 ? 11 : (score.get(cv.length) as number)),
          0
        );
        const newPlayersData = [
          ...game.playersData,
          {
            playerName: "Boggle Bot",
            wordsFound: allWords,
            currentScore: bestScore,
          },
        ];
        playersData = calculateWinner(newPlayersData);
      }
      return {
        ...game,
        selectionGrid,
        error,
        playersData,
        currentPlayer: newPlayer,
        playing,
      };
    }
  }
}
