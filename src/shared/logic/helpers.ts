import { BoggleGame, LetterSquare, PlayerData, SpellingBeeGame } from "./Types";
import { getEntryFromAPI } from "./WordCheckService";
import { de, de_16_die, en_US, en_US_16_die, en_US_25_die } from "./constants";
import { checkDictionary } from "./findAllWords";

// grid helpers
export function getLetter(
  language: string,
  size: number,
  index: number
): string {
  const randomIndex = Math.floor(Math.random() * 6);
  if (language == "English") {
    return size == 4
      ? en_US_16_die[index][randomIndex]
      : size == 5
      ? en_US_25_die[index][randomIndex]
      : en_US[Math.floor(Math.random() * en_US.length)].toUpperCase();
  } else {
    return size == 4
      ? de_16_die[index][randomIndex]
      : de[Math.floor(Math.random() * de.length)].toUpperCase();
  }
}

export function getNewGrid(size: number, language: string): string[][] {
  return Array(size * size)
    .fill("")
    .map((_, i) => getLetter(language, size, i))
    .reduce(
      (acc: string[][], letter: string, index: number) => {
        acc[Math.floor(index / size)][index % size] = letter;
        return acc;
      },
      Array(size)
        .fill("")
        .map(() => Array(size).fill(""))
    );
}

export function noHighlights(size: number): boolean[][] {
  return Array(size)
    .fill(false)
    .map(() => Array(size).fill(false));
}

// initialize game helpers
export function initializePlayersData(players: string[]): PlayerData[] {
  const wordsFound: string[] = [];
  return players.map((p) => ({
    playerName: p,
    wordsFound,
    currentScore: 0,
  }));
}

export const defaultGame: BoggleGame = {
  settings: {
    size: 4,
    language: "English",
    generousMode: true,
    speedMode: false,
  },
  playersData: [
    {
      playerName: "Adrienne",
      wordsFound: [],
      currentScore: 0,
    },
  ],
  grid: getNewGrid(4, "English"),
  selectionGrid: noHighlights(4),
  currentPlayer: 0,
  error: "",
  playing: true,
};

export function wordOnBoard(
  word: string,
  grid: string[][],
  canReuseSquares: boolean
): boolean {
  return !!findWord(word, grid, canReuseSquares).length;
}

// game play helpers
function findWord(
  word: string,
  grid: string[][],
  canReuseSquares: boolean
): boolean[][] {
  const gridList: LetterSquare[] = grid
    .map((row, rowi) =>
      row.map((char, i) => {
        return { row: rowi, col: i, letter: char };
      })
    )
    .flat();
  const queue: LetterSquare[][] = [];
  const startPos = gridList.filter(
    ({ letter }) => letter == word.charAt(0).toUpperCase()
  );
  if (!startPos.length) {
    return [];
  } else {
    startPos.forEach((pos) => queue.push([pos]));
  }
  while (queue.length) {
    const path: LetterSquare[] = queue.shift() as LetterSquare[];
    if (path.length == word.length) {
      const newSelectionGrid = noHighlights(grid.length);
      path.forEach((pos) => (newSelectionGrid[pos.row][pos.col] = true));
      return newSelectionGrid;
    }
    const lastLetterPosition = path[path.length - 1];
    [
      [lastLetterPosition.row + 1, lastLetterPosition.col],
      [lastLetterPosition.row - 1, lastLetterPosition.col],
      [lastLetterPosition.row, lastLetterPosition.col + 1],
      [lastLetterPosition.row, lastLetterPosition.col - 1],
      [lastLetterPosition.row + 1, lastLetterPosition.col + 1],
      [lastLetterPosition.row - 1, lastLetterPosition.col + 1],
      [lastLetterPosition.row + 1, lastLetterPosition.col - 1],
      [lastLetterPosition.row - 1, lastLetterPosition.col - 1],
    ].forEach(([t1, t2]) => {
      if (
        grid[t1] &&
        grid[t1][t2] &&
        grid[t1][t2] == word.charAt(path.length).toUpperCase() &&
        (canReuseSquares ||
          path.filter((pos) => pos.row == t1 && pos.col == t2).length == 0)
      ) {
        queue.push([...path, { row: t1, col: t2, letter: grid[t1][t2] }]);
      }
    });
  }
  return [];
}

export async function searchForWord(
  currentSearch: string,
  language: string,
  playerData: PlayerData,
  grid: string[][],
  generous: boolean
): Promise<{
  selectionGrid: boolean[][];
  error: string;
  playerData: PlayerData;
}> {
  let error = "";
  let selectionGrid = noHighlights(grid.length);
  let newWordsFound = playerData.wordsFound;
  let newScore = playerData.currentScore;
  try {
    const [word] = checkDictionary(currentSearch, language)
      ? [currentSearch]
      : await getEntryFromAPI(currentSearch, language);
    const pathSelectionGrid = findWord(word, grid, generous);
    if (!pathSelectionGrid.length) {
      error = "Word does not appear on the board!";
    } else if (playerData.wordsFound.indexOf(word) != -1) {
      error = "Already found!";
    } else {
      selectionGrid = pathSelectionGrid;
      newWordsFound = [word].concat(playerData.wordsFound);
      newScore += getScore(word.length);
    }
  } catch (err) {
    error = `Not a valid ${language} word`;
  }
  const newPlayerData = {
    ...playerData,
    currentScore: newScore,
    wordsFound: newWordsFound,
  };
  return {
    selectionGrid,
    error,
    playerData: newPlayerData,
  };
}

export const score = new Map<number, number>([
  [1, 0],
  [2, 0],
  [3, 1],
  [4, 1],
  [5, 2],
  [6, 3],
  [7, 5],
  [8, 11],
]);

export function getScore(length: number) {
  return length > 8 ? 11 : (score.get(length) as number);
}

// game over helpers
export function calculateWinner(playersData: PlayerData[]): PlayerData[] {
  const allWords = playersData.reduce(
    (acc, cv) => acc.concat(cv.wordsFound),
    [""]
  );
  const duplicates = allWords.filter(
    (word) => allWords.indexOf(word) != allWords.lastIndexOf(word)
  );
  return playersData.map(({ playerName, wordsFound, currentScore }) => {
    let toSubtract = 0;
    const words = wordsFound
      .filter((word) => word.length > 0)
      .map((word) => {
        if (duplicates.indexOf(word) != -1) {
          toSubtract += getScore(word.length);
          return word.strike();
        } else {
          return word;
        }
      });
    const newScore = Number(currentScore - toSubtract);
    return { playerName, wordsFound: words, currentScore: newScore };
  });
}

// spelling bee helpers

export function getNewLetters(language: string): {
  centerLetter: string;
  edgeLetters: string[];
} {
  const englishLetters = "abcdefghijklmnopqrstuvwxzy".split("");
  const germanLetters = "qwertzuiopüasdfghjklöäyxcvbnm".split("");
  const letters = Array(7)
    .fill("")
    .map((_, i) =>
      language === "English"
        ? englishLetters.splice(
            Math.floor(Math.random() * (englishLetters.length - (i + 1))),
            1
          )[0]
        : germanLetters.splice(
            Math.floor(Math.random() * (germanLetters.length - (i + 1))),
            1
          )[0]
    );
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

export function randomSpellingBee(): SpellingBeeGame {
  const { centerLetter, edgeLetters } = getNewLetters("English");
  return {
    language: "English",
    centerLetter,
    edgeLetters,
    playersData: [
      {
        playerName: "Adrienne",
        wordsFound: [],
        currentScore: 0,
      },
    ],
    error: "",
    currentPlayer: 0,
    playing: true,
  };
}

export async function searchForSpellingBeeWord(
  currentSearch: string,
  language: string,
  playerData: PlayerData,
  centerLetter: string,
  edgeLetters: string[]
): Promise<{
  error: string;
  playerData: PlayerData;
}> {
  let error = "";
  let newWordsFound = playerData.wordsFound;
  let newScore = playerData.currentScore;
  try {
    const [word] = checkDictionary(currentSearch, language)
      ? [currentSearch]
      : await getEntryFromAPI(currentSearch, language);
    if (word.indexOf(centerLetter) === -1) {
      error = "Must use center letter!";
    } else if (playerData.wordsFound.indexOf(word) != -1) {
      error = "Already found!";
    } else if (
      [...word].some(
        (letter) => edgeLetters.concat(centerLetter).indexOf(letter) === -1
      )
    ) {
      error = "Word is not on the board!";
    } else {
      newWordsFound = [word].concat(playerData.wordsFound);
      newScore += getScore(word.length);
    }
  } catch (err) {
    error = `Not a valid ${language} word`;
  }
  const newPlayerData = {
    ...playerData,
    currentScore: newScore,
    wordsFound: newWordsFound,
  };
  return {
    error,
    playerData: newPlayerData,
  };
}
