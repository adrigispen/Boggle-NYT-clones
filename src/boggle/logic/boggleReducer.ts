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
      const selectionGrid = noHighlights(action.payload.size);
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
      let playersData = game.playersData;
      const newPlayer = getNextPlayer(
        game.settings.speedMode,
        game.currentPlayer,
        game.playersData
      );
      const playing = newPlayer == -1 ? false : true;
      if (!playing) {
        const boggleBotData = findAllWordsOnBoggleBoard(
          game.grid,
          game.settings.generousMode,
          game.settings.language
        );
        const newPlayersData = [...game.playersData, boggleBotData];
        playersData = calculateWinner(newPlayersData);
      }
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
  }
}
