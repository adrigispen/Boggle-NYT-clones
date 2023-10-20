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
import { getViableLetters } from "./beeHelpers";

export default function spellingBeeReducer(
  game: SpellingBeeGame,
  action: SpellingBeeAction
) {
  switch (action.type) {
    case SpellingBeeActionType.GAME_STARTED: {
      const { language, playersData, speedMode } = action.payload;
      const { centerLetter, edgeLetters } = getViableLetters(
        language ?? game.language
      );
      return {
        language: language ?? game.language,
        playersData:
          playersData ??
          game.playersData
            .filter(({ playerName }) => playerName !== "All words")
            .map(({ playerName }) => ({
              playerName,
              wordsFound: [],
              currentScore: 0,
            })),
        centerLetter: centerLetter,
        edgeLetters: edgeLetters,
        error: "",
        currentPlayer: 0,
        speedMode: speedMode ?? game.speedMode,
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
      const finalPlayersData = calculateWinner(game.playersData);
      if (game.playing) {
        const allWords = findAllSpellingBeeWords(
          game.language,
          game.centerLetter,
          game.edgeLetters
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
