import {
  SpellingBeeGame,
  BoggleGame,
  WordGameAction,
  WordGameActionType,
} from "./Types";
import { calculateWinner, getNextPlayer } from "./scoringHelpers";

export default function wordGameReducer(
  game: BoggleGame | SpellingBeeGame,
  action: WordGameAction
): BoggleGame | SpellingBeeGame {
  switch (action.type) {
    case WordGameActionType.TURN_ENDED: {
      const playersData = game.playersData;
      const newPlayer = getNextPlayer(
        game.speedMode,
        game.currentPlayer,
        game.playersData
      );
      return {
        ...game,
        playersData,
        currentPlayer: newPlayer,
      };
    }
    case WordGameActionType.GAME_ENDED: {
      const finalPlayersData = calculateWinner(game.playersData);
      finalPlayersData.push(action.payload.allWords);
      return {
        ...game,
        playersData: finalPlayersData,
        currentPlayer: -1,
        playing: false,
      };
    }
    case WordGameActionType.ERROR_CLEARED: {
      return {
        ...game,
        error: "",
      };
    }
    case WordGameActionType.GAME_STARTED: {
      return action.payload.game;
    }
    case WordGameActionType.WORD_SEARCHED: {
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
    case WordGameActionType.SHUFFLED: {
      return {
        ...game,
        edgeLetters: action.payload.edgeLetters,
      } as SpellingBeeGame;
    }
    case WordGameActionType.BOARD_UPDATED: {
      const selectionGrid = action.payload.selectionGrid;
      return {
        ...game,
        selectionGrid,
      } as BoggleGame;
    }
  }
}
