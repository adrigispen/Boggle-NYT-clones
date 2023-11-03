import { getNewGrid, noHighlights } from "../../boggle/logic/gridHelpers";
import { getViableLetters } from "../../spellingBee/logic/beeHelpers";
import {
  WordGame,
  WordGameAction,
  WordGameActionType,
  WordGameType,
} from "./Types";
import { calculateWinner, getNextPlayer } from "./scoringHelpers";

export default function wordGameReducer(
  game: WordGame,
  action: WordGameAction
) {
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
      const { language, playersData, speedMode } = action.payload;
      let newGame = {
        ...game,
        language: language ?? game.language,
        speedMode: speedMode ?? game.speedMode,
        error: "",
        currentPlayer: 0,
        playing: true,
        playersData:
          playersData ??
          game.playersData
            .filter(({ playerName }) => playerName !== "All words")
            .map(({ playerName }) => ({
              playerName,
              wordsFound: [],
              currentScore: 0,
            })),
      };
      if (game.type === WordGameType.BOGGLE) {
        const { size, generousMode } = action.payload;
        const selectionGrid = noHighlights(size ?? game.size);
        const grid = getNewGrid(size ?? game.size, language ?? game.language);
        newGame = {
          ...newGame,
          type: WordGameType.BOGGLE,
          size: size ?? game.size,
          generousMode: generousMode ?? game.generousMode,
          grid,
          selectionGrid,
        };
      } else {
        const { centerLetter, edgeLetters } = getViableLetters(
          language ?? game.language
        );
        newGame = {
          ...newGame,
          type: WordGameType.SPELLINGBEE,
          centerLetter: centerLetter,
          edgeLetters: edgeLetters,
        };
      }
      return newGame;
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
      };
    }
    case WordGameActionType.BOARD_UPDATED: {
      const selectionGrid = action.payload.selectionGrid;
      return {
        ...game,
        selectionGrid,
      };
    }
  }
}
