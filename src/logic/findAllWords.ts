import { PlayerData } from "../components/Types";
import { Typo } from "typo-js-ts";
import { score, wordOnBoard } from "./helpers";

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
    currentScore: words.reduce(
      (acc, cv) =>
        acc + (cv.length > 8 ? 11 : (score.get(cv.length) as number)),
      0
    ),
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
  letters: string[]
): PlayerData {
  let words: string[] = [];
  const dictionaryWords =
    language === "English"
      ? Object.keys(dictionaryEn.dictionaryTable)
      : Object.keys(dictionaryDe.dictionaryTable);
  dictionaryWords.forEach((word) => {
    if (
      word.length > 4 && // we'll let players have a chance to win - SBB only finds 5+ words
      word !== word.toUpperCase() && // don't want abbreviations
      (language === "Deutsch" || word === word.toLowerCase()) && // if we're looking for English words, they shouldn't be capitalized
      word.indexOf(letters[0]) !== -1 &&
      [...word].every((letter) => letters.indexOf(letter) !== -1)
    )
      words = words.concat(word);
  });
  return {
    playerName: "SpellingBeeBot",
    wordsFound: words.sort((a, b) => b.length - a.length),
    currentScore: words.reduce(
      (acc, cv) =>
        acc + (cv.length > 8 ? 11 : (score.get(cv.length) as number)),
      0
    ),
  };
}
