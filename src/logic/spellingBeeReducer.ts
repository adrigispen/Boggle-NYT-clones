import {
  SpellingBeeGame,
  SpellingBeeAction,
  SpellingBeeActionType,
} from "../components/Types";
import { findSpellingBeeWords } from "./findAllWords";
import { calculateWinner, getNewLetters } from "./helpers";

export default function spellingBeeReducer(
  game: SpellingBeeGame,
  action: SpellingBeeAction
) {
  switch (action.type) {
    case SpellingBeeActionType.GAME_STARTED: {
      const letters = getNewLetters(action.payload.language);
      return {
        language: action.payload.language,
        playersData: action.payload.playersData,
        letters,
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
      const newPlayer = (game.currentPlayer + 1) % game.playersData.length;
      const playing = newPlayer == -1 ? false : true;
      if (!playing) {
        const spellingBeeBotData = findSpellingBeeWords(
          game.language,
          game.letters
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
  }
}
