import {
  BoggleGame,
  LetterSquare,
  WordGameType,
} from "../../shared/logic/Types";
import {
  de,
  de_16_die,
  en_US,
  en_US_16_die,
  en_US_25_die,
  LANGUAGE,
} from "../../shared/logic/constants";

export function getLetter(
  language: string,
  size: number,
  index: number
): string {
  const randomIndex = Math.floor(Math.random() * 6);
  if (language == LANGUAGE.ENGLISH) {
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

export function wordOnBoard(
  word: string,
  grid: string[][],
  canReuseSquares: boolean
): boolean {
  return !!getWordPath(word, grid, canReuseSquares).length;
}

export function getWordPath(
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

export const defaultGame: BoggleGame = {
  type: WordGameType.BOGGLE,
  size: 4,
  language: LANGUAGE.ENGLISH,
  generousMode: true,
  speedMode: false,
  playersData: [
    {
      playerName: "Player 1",
      wordsFound: [],
      currentScore: 0,
    },
  ],
  grid: getNewGrid(4, LANGUAGE.ENGLISH),
  selectionGrid: noHighlights(4),
  currentPlayer: 0,
  error: "",
  playing: true,
};
