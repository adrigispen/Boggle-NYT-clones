import {
  SpellingBeeGame,
  SpellingBeeAction,
  SpellingBeeActionType,
} from "../../shared/logic/Types";
import { findSpellingBeeWords } from "../../shared/logic/findAllWords";
import { calculateWinner } from "../../shared/logic/helpers";

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
      let playersData = game.playersData;
      const error = "";
      const newPlayer =
        game.currentPlayer < game.playersData.length - 1
          ? game.currentPlayer + 1
          : -1;
      const playing = newPlayer == -1 ? false : true;
      if (!playing) {
        const spellingBeeBotData = findSpellingBeeWords(
          game.language,
          game.centerLetter,
          game.edgeLetters
        );
        const newPlayersData = [...game.playersData, spellingBeeBotData];
        playersData = calculateWinner(newPlayersData);
      }
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
  }
}
