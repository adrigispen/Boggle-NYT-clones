import { PlayerData } from "./Types";
import { Typo } from "typo-js-ts";
import { wordOnBoard, getWordPath } from "../../boggle/logic/gridHelpers";
import { getScore } from "./scoringHelpers";

const dictionaryEn = new Typo("en_US");
const dictionaryDe = new Typo("de_DE");

dictionaryDe.ready.then(() => {
  console.log("bereit");
});

dictionaryEn.ready.then(() => {
  console.log("ready");
});

// boggle helpers
export function findAllWordsOnBoggleBoard(
  grid: string[][],
  canReuseSquares: boolean,
  language: string
): PlayerData {
  let words: string[] = [];
  const dictionaryWords =
    language === "English"
      ? Object.keys(dictionaryEn.dictionaryTable)
      : Object.keys(dictionaryDe.dictionaryTable);
  dictionaryWords.forEach((word) => {
    if (
      word.length > 4 && // we'll let players have a chance to win - BB only finds 5+ words
      word !== word.toUpperCase() && // don't want abbreviations
      (language === "Deutsch" || word === word.toLowerCase()) && // if we're looking for English words, they shouldn't be capitalized
      wordOnBoard(word, grid, canReuseSquares)
    )
      words = words.concat(word);
  });
  return {
    playerName: "BoggleBot",
    wordsFound: words.sort((a, b) => b.length - a.length),
    currentScore: words.reduce((acc, cv) => acc + getScore(cv.length), 0),
  };
}

export function isValidWordInLanguage(word: string, language: string): boolean {
  return language === "English"
    ? dictionaryEn.check(word)
    : dictionaryDe.check(word);
}

function isNewWordForPlayer(word: string, wordsFound: string[]): boolean {
  return wordsFound.indexOf(word) == -1;
}

export function searchForWord(
  currentSearch: string,
  language: string,
  playerData: PlayerData,
  grid: string[][],
  generousMode: boolean
): { error: string; selectionGrid?: boolean[][]; newPlayerData?: PlayerData } {
  if (!isValidWordInLanguage(currentSearch, language))
    return { error: `Not a valid ${language} word` };
  if (!isNewWordForPlayer(currentSearch, playerData.wordsFound))
    return { error: "Already found!" };
  const path = getWordPath(currentSearch, grid, generousMode);
  if (!path.length) return { error: "Word does not appear on the board" };
  // okay, all our errors covered, so we have a valid new word on the board.
  return {
    error: "",
    selectionGrid: path,
    newPlayerData: {
      ...playerData,
      wordsFound: [currentSearch].concat(playerData.wordsFound),
      currentScore: getScore(currentSearch.length) + playerData.currentScore,
    },
  };
}

// spelling bee helpers

export function pangramExists(letters: string, language: string) {
  const dictionary =
    language === "English"
      ? Object.keys(dictionaryEn.dictionaryTable)
      : Object.keys(dictionaryDe.dictionaryTable);
  const r = new RegExp(`^[${letters}]+$`, "i");
  const word = dictionary.find(
    (word) =>
      letters.split("").every((l) => word.indexOf(l) !== -1) && word.match(r)
  );
  return word === undefined ? false : true;
}

export function findAllSpellingBeeWords(
  language: string,
  centerLetter: string,
  edgeLetters: string[]
): PlayerData {
  let words: string[] = [];
  const dictionaryWords =
    language === "English"
      ? Object.keys(dictionaryEn.dictionaryTable)
      : Object.keys(dictionaryDe.dictionaryTable);
  dictionaryWords.forEach((word) => {
    if (
      (word.length > 3 || (language === "Deutsch" && word.length > 2)) && // we'll let players have a chance to win - SBB only finds 4+ words in Eng, 3+ in German
      word !== word.toUpperCase() && // don't want abbreviations
      (language === "Deutsch" || word === word.toLowerCase()) && // if we're looking for English words, they shouldn't be capitalized
      word.indexOf(centerLetter) !== -1 &&
      [...word].every(
        (letter) => edgeLetters.concat(centerLetter).indexOf(letter) !== -1
      )
    )
      words = words.concat(word);
  });
  return {
    playerName: "SpellingBeeBot",
    wordsFound: words.sort((a, b) => b.length - a.length),
    currentScore: words.reduce((acc, cv) => acc + getScore(cv.length), 0),
  };
}

export function searchForSpellingBeeWord(
  currentSearch: string,
  language: string,
  playerData: PlayerData,
  centerLetter: string,
  edgeLetters: string[]
): { error: string; newPlayerData?: PlayerData } {
  if (!isValidWordInLanguage(currentSearch, language))
    return { error: `Not a valid ${language} word` };
  if (!isNewWordForPlayer(currentSearch, playerData.wordsFound))
    return { error: "Already found!" };
  if (currentSearch.indexOf(centerLetter) === -1)
    return { error: "Must use center letter!" };
  if (
    [...currentSearch].some(
      (letter) => edgeLetters.concat(centerLetter).indexOf(letter) === -1
    )
  )
    return { error: "Word is not on the board!" };
  // word is valid, new for the player, uses the center letter, and uses only the 7 letters
  return {
    error: "",
    newPlayerData: {
      ...playerData,
      wordsFound: [currentSearch].concat(playerData.wordsFound),
      currentScore: getScore(currentSearch.length) + playerData.currentScore,
    },
  };
}
