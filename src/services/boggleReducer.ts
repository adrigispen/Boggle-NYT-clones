import {
  BoggleGame,
  BoggleAction,
  BoggleActionType,
} from "../components/Types";
import { findWord, noHighlights, score } from "../helpers";
import { checkWord } from "./WordCheckService";

export default function boggleReducer(game: BoggleGame, action: BoggleAction) {
  switch (action.type) {
    // case BoggleActionType.GAME_STARTED: {
    //   const selectionGrid = Array(action.payload.size)
    //     .fill(false)
    //     .map(() => Array(action.payload.size).fill(false));
    //   console.log(selectionGrid);
    //   const grid = getNewGrid(action.payload.size, action.payload.language);
    //   console.log(grid);
    //   return {
    //     ...game,
    //     settings: {
    //       size: action.payload.size,
    //       language: action.payload.language,
    //       speedMode: action.payload.speedMode,
    //       generousMode: action.payload.generousMode,
    //     },
    //     playersData: action.payload.playersData,
    //     grid: grid,
    //     selectionGrid: selectionGrid,
    //   };
    // }
    case BoggleActionType.WORD_SEARCHED: {
      handleSearch(action.payload.currentSearch, game);
      return game;
    }
    case BoggleActionType.TURN_ENDED: {
      if (game.settings.speedMode) {
        game.currentPlayer = (game.currentPlayer + 1) % game.playersData.length;
        game.selectionGrid = noHighlights(game.settings.size);
        game.error = "";
      } else {
        if (game.currentPlayer < game.playersData.length - 1) {
          game.currentPlayer = game.currentPlayer + 1;
          game.selectionGrid = noHighlights(game.settings.size);
          game.error = "";
        } else {
          game.selectionGrid = noHighlights(game.settings.size);
          game.error = "";
        }
      }
      return { ...game };
    }
  }
}

async function handleSearch(currentSearch: string, game: BoggleGame) {
  try {
    const [word] = await checkWord(currentSearch, game.settings.language);
    const pathSelectionGrid = findWord(
      word,
      game.grid,
      game.settings.generousMode
    );
    if (!pathSelectionGrid.length) {
      game.error = "Word does not appear on the board!";
      game.selectionGrid = noHighlights(game.settings.size);
    } else if (
      game.playersData[game.currentPlayer].wordsFound.indexOf(word) != -1
    ) {
      game.error = "Already found!";
      game.selectionGrid = noHighlights(game.settings.size);
    } else {
      game.error = "";
      game.selectionGrid = pathSelectionGrid;
      const newPlayersData = game.playersData.map((data, i) =>
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
      game.playersData = newPlayersData;
    }
  } catch (err) {
    game.error = `Not a valid ${game.settings.language} word`;
    game.selectionGrid = noHighlights(game.settings.size);
  }
  game.currentPlayer = game.settings.speedMode
    ? (game.currentPlayer + 1) % game.playersData.length
    : game.currentPlayer;
}
