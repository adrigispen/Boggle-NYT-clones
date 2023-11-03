import {
  SpellingBeeGame,
  WordGameType,
} from "../../shared/logic/Types";
import { pangramExists } from "../../shared/logic/dictionaryWordCheckService";

function getLetters(): string[] {
  const possibleLetters = "abcdefghijklmnopqrstuvwxzy".split("");
  return Array(7)
    .fill("")
    .map(
      (_, i) =>
        possibleLetters.splice(
          Math.floor(Math.random() * (possibleLetters.length - (i + 1))),
          1
        )[0]
    );
}

export function isPangram(word: string): boolean {
  return new Set([...word]).size === 7;
}

export function getViableLetters(language: string): {
  centerLetter: string;
  edgeLetters: string[];
} {
  let letters = getLetters();
  while (!pangramExists(letters.join(""), language)) {
    letters = getLetters();
  }
  return { centerLetter: letters[0], edgeLetters: letters.slice(1) };
}

export function shuffle(letters: string[]): string[] {
  let currentIndex = letters.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [letters[currentIndex], letters[randomIndex]] = [
      letters[randomIndex],
      letters[currentIndex],
    ];
  }
  return letters;
}

//const { centerLetter, edgeLetters } = getViableLetters("English");

export const initialSpellingBee: SpellingBeeGame = {
  type: WordGameType.SPELLINGBEE,
  language: "English",
  centerLetter: "e",
  edgeLetters: ["o", "n", "y", "a", "d", "s"],
  playersData: [
    {
      playerName: "Player 1",
      wordsFound: [],
      currentScore: 0,
    },
  ],
  error: "",
  currentPlayer: 0,
  speedMode: false,
  playing: true,
};
