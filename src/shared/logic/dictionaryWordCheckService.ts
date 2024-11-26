import { PlayerData } from "./Types";
import { wordOnBoard, getWordPath } from "../../boggle/logic/gridHelpers";
import { getScore } from "./scoringHelpers";
import { isPangram } from "../../spellingBee/logic/beeHelpers";
import { enDictionaryWords } from "../../../dictionaries/en_US/words";
import { deDictionaryWords } from "../../../dictionaries/de_DE/woerter";
import { LANGUAGE } from "./constants";

// boggle helpers
export function findAllWordsOnBoggleBoard(
  grid: string[][],
  canReuseSquares: boolean,
  language: string
): PlayerData {
  let words: string[] = [];
  const dictionaryWords =
    language === LANGUAGE.ENGLISH ? enDictionaryWords : deDictionaryWords;
  dictionaryWords.forEach((word) => {
    if (
      word.split("/")[0].length > 4 && // we'll let players have a chance to win - BB only finds 5+ words
      word !== word.toUpperCase() && // don't want abbreviations
      (language === LANGUAGE.GERMAN || word === word.toLowerCase()) && // if we're looking for English words, they shouldn't be capitalized
      wordOnBoard(word, grid, canReuseSquares)
    )
      words = words.concat(word);
  });
  return {
    playerName: "All words",
    wordsFound: words.sort((a, b) => b.length - a.length),
    currentScore: words.reduce((acc, cv) => acc + getScore(cv.length), 0),
  };
}

export function isValidWordInLanguage(word: string, language: string): boolean {
  return language === LANGUAGE.ENGLISH
    ? enDictionaryWords.includes(word)
    : deDictionaryWords.includes(word);
}

function isNewWordForPlayer(word: string, wordsFound: string[]): boolean {
  const wordR = new RegExp(`^${word}$`, "i");
  return wordsFound.reduce(
    (acc, word) => acc && word.match(wordR) == undefined,
    true
  );
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
  console.log(language);
  const dictionary =
    language === LANGUAGE.ENGLISH ? enDictionaryWords : deDictionaryWords;
  const r = new RegExp(`^[${letters}]+$`, "i");
  const word = dictionary.find(
    (word) =>
      letters.split("").every((l) => word.indexOf(l) !== -1) && word.match(r)
  );
  console.log(word);
  return word === undefined ? false : true;
}

export function findAllSpellingBeeWords(
  language: string,
  centerLetter: string,
  edgeLetters: string[]
): PlayerData {
  let words: string[] = [];
  const dictionaryWords =
    language === LANGUAGE.ENGLISH ? enDictionaryWords : deDictionaryWords;
  dictionaryWords.forEach((word) => {
    if (
      word.length > 3 && // we'll let players have a chance to win - SBB only finds 4+ words
      word !== word.toUpperCase() && // don't want abbreviations
      (language === "Deutsch" || word === word.toLowerCase()) && // if we're looking for English words, they shouldn't be capitalized
      word.toLowerCase().indexOf(centerLetter) !== -1 &&
      [...word.toLowerCase()].every(
        (letter) => edgeLetters.concat(centerLetter).indexOf(letter) !== -1
      )
    ) {
      if (isPangram(word)) word = word.toUpperCase();
      words = words.concat(word);
    }
  });
  return {
    playerName: "All words",
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
  if (currentSearch.toLowerCase().indexOf(centerLetter) === -1)
    return { error: "Must use center letter!" };
  if (
    [...currentSearch.toLowerCase()].some(
      (letter) => edgeLetters.concat(centerLetter).indexOf(letter) === -1
    )
  )
    return { error: "Word is not on the board!" };
  // word is valid, new for the player, uses the center letter, and uses only the 7 letters
  if (isPangram(currentSearch)) currentSearch = currentSearch.toUpperCase();
  return {
    error: "",
    newPlayerData: {
      ...playerData,
      wordsFound: [currentSearch].concat(playerData.wordsFound),
      currentScore: getScore(currentSearch.length) + playerData.currentScore,
    },
  };
}
