import {
  BoggleGame,
  BoggleAction,
  BoggleActionType,
} from "../../shared/logic/Types";
import { findAllWordsOnBoggleBoard } from "../../shared/logic/dictionaryWordCheckService";
import {
  calculateWinner,
  getNextPlayer,
} from "../../shared/logic/scoringHelpers";
import { getNewGrid, noHighlights } from "./gridHelpers";

export default function boggleReducer(game: BoggleGame, action: BoggleAction) {
  switch (action.type) {
    case BoggleActionType.GAME_STARTED: {
      const { size, language, generousMode, speedMode, playersData } =
        action.payload;
      const selectionGrid = noHighlights(size ?? game.settings.size);
      const grid = getNewGrid(
        size ?? game.settings.size,
        language ?? game.settings.language
      );
      return {
        ...game,
        settings: {
          size: size ?? game.settings.size,
          language: language ?? game.settings.language,
          speedMode: speedMode ?? game.settings.speedMode,
          generousMode: generousMode ?? game.settings.generousMode,
        },
        playersData:
          playersData ??
          game.playersData
            .filter(({ playerName }) => playerName !== "All words")
            .map(({ playerName }) => ({
              playerName,
              wordsFound: [],
              currentScore: 0,
            })),
        grid,
        selectionGrid,
        error: "",
        currentPlayer: 0,
        playing: true,
      };
    }
    case BoggleActionType.WORD_SEARCHED: {
      const { playerData, error } = action.payload;
      const playersData = game.playersData.map((data) =>
        data.playerName == playerData.playerName ? playerData : data
      );
      return {
        ...game,
        playersData,
        error,
      };
    }
    case BoggleActionType.TURN_ENDED: {
      const playersData = game.playersData;
      const newPlayer = getNextPlayer(
        game.settings.speedMode,
        game.currentPlayer,
        game.playersData
      );
      const playing = newPlayer == -1 ? false : true;
      return {
        ...game,
        playersData,
        currentPlayer: newPlayer,
        playing,
      };
    }
    case BoggleActionType.GRID_UPDATED: {
      const selectionGrid = action.payload.selectionGrid;
      return {
        ...game,
        selectionGrid,
        error: "",
      };
    }
    case BoggleActionType.GAME_ENDED: {
      const finalPlayersData = calculateWinner(game.playersData);
      if (game.playing) {
        const allWords = findAllWordsOnBoggleBoard(
          game.grid,
          game.settings.generousMode,
          game.settings.language
        );
        finalPlayersData.push(allWords);
      }
      return {
        ...game,
        playersData: finalPlayersData,
        currentPlayer: -1,
        playing: false,
      };
    }
  }
}
