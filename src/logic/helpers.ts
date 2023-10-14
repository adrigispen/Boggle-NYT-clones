import { BoggleGame, LetterSquare, PlayerData } from "../components/Types";
import { checkWord } from "./WordCheckService";
import { de, de_16_die, en_US, en_US_16_die, en_US_25_die } from "./constants";

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
    .map((e, i) => getLetter(language, size, i))
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
    size: 3,
    language: "English",
    generousMode: false,
    speedMode: false,
  },
  playersData: [
    {
      playerName: "Player 1",
      wordsFound: [],
      currentScore: 0,
    },
    {
      playerName: "Player 2",
      wordsFound: [],
      currentScore: 0,
    },
  ],
  grid: getNewGrid(3, "English"),
  selectionGrid: noHighlights(3),
  currentPlayer: 0,
  error: "",
  playing: true,
};

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
    const [word] = await checkWord(currentSearch, language);
    const pathSelectionGrid = findWord(word, grid, generous);
    if (!pathSelectionGrid.length) {
      error = "Word does not appear on the board!";
    } else if (playerData.wordsFound.indexOf(word) != -1) {
      error = "Already found!";
    } else {
      selectionGrid = pathSelectionGrid;
      newWordsFound = [word].concat(playerData.wordsFound);
      newScore += word.length > 8 ? 11 : (score.get(word.length) as number);
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
          toSubtract += score.get(word.length) as number;
          return word.strike();
        } else {
          return word;
        }
      });
    const newScore = Number(currentScore - toSubtract);
    return { playerName, wordsFound: words, currentScore: newScore };
  });
}
