import { PlayerData } from "../shared/logic/Types";
import { Typo } from "typo-js-ts";
import { getScore, wordOnBoard } from "./helpers";

const dictionaryEn = new Typo("en_US");

dictionaryEn.ready.then(() => {
  console.log("ready");
});

const dictionaryDe = new Typo("de_DE");

dictionaryDe.ready.then(() => {
  console.log("bereit");
});

export function findWords(
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

export function checkDictionary(word: string, language: string): boolean {
  return language == "English"
    ? dictionaryEn.check(word)
    : dictionaryDe.check(word);
}

// spelling bee helpers

export function findSpellingBeeWords(
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
