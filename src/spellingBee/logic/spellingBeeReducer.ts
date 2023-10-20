import {
  SpellingBeeGame,
  SpellingBeeAction,
  SpellingBeeActionType,
} from "../../shared/logic/Types";
import { findAllSpellingBeeWords } from "../../shared/logic/dictionaryWordCheckService";
import {
  calculateWinner,
  getNextPlayer,
} from "../../shared/logic/scoringHelpers";

export default function spellingBeeReducer(
  game: SpellingBeeGame,
  action: SpellingBeeAction
) {
  switch (action.type) {
    case SpellingBeeActionType.GAME_STARTED: {
      return {
        language: action.payload.language,
        playersData: action.payload.playersData,
        centerLetter: action.payload.centerLetter,
        edgeLetters: action.payload.edgeLetters,
        error: "",
        currentPlayer: 0,
        speedMode: action.payload.speedMode,
        playing: true,
      };
    }
    case SpellingBeeActionType.WORD_SEARCHED: {
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
    case SpellingBeeActionType.TURN_ENDED: {
      const playersData = game.playersData;
      const error = "";
      const newPlayer = getNextPlayer(
        game.speedMode,
        game.currentPlayer,
        game.playersData
      );
      const playing = newPlayer == -1 ? false : true;
      return {
        ...game,
        error,
        playersData,
        currentPlayer: newPlayer,
        playing,
      };
    }
    case SpellingBeeActionType.SHUFFLE: {
      return {
        ...game,
        edgeLetters: action.payload.edgeLetters,
      };
    }
    case SpellingBeeActionType.GAME_ENDED: {
      let finalPlayersData = game.playersData;
      if (game.playing) {
        const spellingBeeBotData = findAllSpellingBeeWords(
          game.language,
          game.centerLetter,
          game.edgeLetters
        );
        const newPlayersData = [...game.playersData, spellingBeeBotData];
        finalPlayersData = calculateWinner(newPlayersData);
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
