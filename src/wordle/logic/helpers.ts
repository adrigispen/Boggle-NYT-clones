import { isValidWordInLanguage } from "../../shared/logic/dictionaryWordCheckService";
import {
  GuessStatus,
  WordGameType,
  WordleGame,
} from "../../shared/logic/Types";

export const defaultGame: WordleGame = {
  playersData: [{ playerName: "", wordsFound: [], currentScore: 0 }],
  error: "",
  playing: true,
  currentPlayer: 0,
  speedMode: false,
  language: "English",
  type: WordGameType.WORDLE,
  grid: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  answer: "SLATE",
};

export function getWordleWord(): string {
  const words = [
    "aback",
    "abase",
    "abate",
    "abbey",
    "abbot",
    "abhor",
    "abide",
    "abled",
    "abler",
    "abode",
    "abort",
    "about",
    "above",
    "abuse",
    "abyss",
    "acorn",
    "acrid",
    "acted",
    "actor",
    "acute",
    "adage",
    "adapt",
    "added",
    "adder",
    "addle",
    "adept",
    "admin",
    "admit",
    "adobe",
    "adopt",
    "adore",
    "adorn",
    "adult",
    "affix",
    "afire",
    "afoot",
    "afore",
    "after",
    "again",
    "agape",
    "agate",
    "agent",
    "agile",
    "aging",
    "aglow",
    "agony",
    "agree",
    "ahead",
    "aisle",
    "alarm",
    "album",
    "alert",
    "algae",
    "alibi",
    "alien",
    "align",
    "alike",
    "alive",
    "allay",
    "alley",
    "allot",
    "allow",
    "alloy",
    "aloft",
    "alone",
    "along",
    "aloof",
    "aloud",
    "alpha",
    "altar",
    "alter",
    "amber",
    "amend",
    "amiss",
    "amity",
    "among",
    "ample",
    "amply",
    "amuse",
    "angel",
    "anger",
    "angle",
    "angry",
    "angst",
    "anime",
    "ankle",
    "annex",
    "annoy",
    "annul",
    "anode",
    "antic",
    "anvil",
    "aorta",
    "apart",
    "apple",
    "apply",
    "apron",
    "aptly",
    "arbor",
    "ardor",
    "arena",
    "argue",
    "arise",
    "armed",
    "armor",
    "aroma",
    "arose",
    "array",
    "arrow",
    "arson",
    "artsy",
    "ascot",
    "ashen",
    "aside",
    "asked",
    "askew",
    "asset",
    "atone",
    "attic",
    "audio",
    "audit",
    "auger",
    "augur",
    "aunts",
    "aunty",
    "avail",
    "avert",
    "avian",
    "avoid",
    "await",
    "awake",
    "award",
    "aware",
    "awash",
    "awful",
    "awoke",
    "axiom",
    "azure",
    "bacon",
    "badge",
    "badly",
    "bagel",
    "baggy",
    "baker",
    "baldy",
    "baler",
    "balky",
    "balsa",
    "banal",
    "banjo",
    "barge",
    "baron",
    "basic",
    "basil",
    "about",
    "other",
    "which",
    "their",
    "there",
    "could",
    "would",
    "these",
    "those",
    "world",
    "sound",
    "place",
    "great",
    "small",
    "every",
    "never",
    "under",
    "water",
    "after",
    "first",
    "where",
    "while",
    "thing",
    "words",
    "light",
    "night",
    "years",
    "might",
    "times",
    "white",
    "black",
    "green",
    "power",
    "point",
    "today",
    "above",
    "right",
    "think",
    "found",
    "house",
    "heart",
    "begin",
    "again",
    "woman",
    "group",
    "class",
    "table",
    "field",
    "plant",
    "study",
    "round",
    "music",
    "river",
    "mount",
    "ocean",
    "write",
    "early",
    "later",
    "peace",
    "storm",
    "clear",
    "stone",
    "money",
    "sugar",
    "truth",
    "value",
    "sweet",
    "space",
    "voice",
    "floor",
    "store",
    "human",
    "brain",
    "glass",
    "fruit",
    "green",
    "bread",
    "dream",
    "youth",
    "brown",
    "shape",
    "model",
    "giant",
    "tears",
    "smile",
    "lives",
    "lucky",
    "enemy",
    "magic",
    "title",
    "lunch",
    "thumb",
    "stars",
    "coins",
    "wings",
    "piano",
    "paint",
    "drive",
    "union",
    "shoes",
    "style",
    "waste",
    "teeth",
    "grass",
    "jelly",
    "block",
    "pills",
    "spend",
    "trash",
    "oasis",
    "charm",
    "blaze",
  ];
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}

export function isLegalWord(guess: string) {
  return isValidWordInLanguage(guess, "English") && guess.length === 5;
}

export function getGuessStatus(
  grid: string[][],
  row: number,
  col: number,
  letter: string,
  answer: string
): GuessStatus {
  if (letter === "") {
    return GuessStatus.OPEN;
  } else if (answer[col] === letter) {
    return GuessStatus.CORRECT;
  } else if (answer.indexOf(letter.toUpperCase()) !== -1) {
    const remainders = removeGreenAndPriorYellows(
      grid[row].join(""),
      answer,
      col
    );
    console.log(remainders);
    if (
      remainders.newAnswer.indexOf(letter) !== -1
    ) {
      return GuessStatus.WRONG_POSITION;
    }
    return GuessStatus.INCORRECT;
  } else {
    return GuessStatus.INCORRECT;
  }
}

export function removeGreenAndPriorYellows(
  guess: string,
  answer: string, 
  index: number,
): { newGuess: string; newAnswer: string; } {
  //remove correctly positioned letters
  let newGuess = [...guess]
    .map((letter, i) => {
      if (answer[i] === letter) {
        return "";
      } else {
        return letter;
      }
    })
    .join("").toUpperCase();
  let newAnswer = [...answer]
    .map((letter, i) => (guess[i] === letter ? "" : letter))
    .join("").toUpperCase();
  
  //remove duplicate yellows
  if (newAnswer.split(guess[index]).length < newGuess.split(guess[index]).length && newGuess.indexOf(guess[index]) < index) {
    newAnswer = newAnswer.replace(guess[index], "");
    newGuess = newGuess.replace(guess[index], "");
    console.log(newAnswer.split(guess[index]), newGuess.split(guess[index]));
  }
  return { newGuess, newAnswer };
}