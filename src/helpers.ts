import { LetterSquareProps } from "./Components/Settings.types";

export function getRandomLetter(language: string): string {
  return language == "English"
    ? en_US[Math.floor(Math.random() * en_US.length)]
    : de[Math.floor(Math.random() * de.length)];
}

export function getNewGrid(size: number, language: string): string[][] {
  return Array(size * size)
    .fill("")
    .map(() => getRandomLetter(language))
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

export function findWord(word: string, grid: string[][]): LetterSquareProps[] {
  const gridList: LetterSquareProps[] = grid
    .map((row, rowi) =>
      row.map((char, i) => {
        return { row: rowi, col: i, letter: char };
      })
    )
    .flat();
  const queue: LetterSquareProps[][] = [];
  const startPos = gridList.filter(({ letter }) => letter == word.charAt(0));
  if (!startPos.length) {
    return [];
  } else {
    startPos.forEach((pos) => queue.push([pos]));
  }
  while (queue) {
    const path: LetterSquareProps[] = queue.shift();
    if (path.length == word.length) {
      return path;
    }
    const lastLetterPosition = path[path.length - 1];
    [
      [lastLetterPosition.row + 1, lastLetterPosition.col],
      [lastLetterPosition.row - 1, lastLetterPosition.col],
      [lastLetterPosition.row, lastLetterPosition.col + 1],
      [lastLetterPosition.row, lastLetterPosition.col - 1],
    ].forEach(([t1, t2]) => {
      if (
        grid[t1] &&
        grid[t1][t2] &&
        grid[t1][t2] == word.charAt(path.length)
      ) {
        queue.push([...path, { row: t1, col: t2, letter: grid[t1][t2] }]);
      }
    });
  }
  return [];
}

const en_US: string[] = [
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "b",
  "b",
  "b",
  "c",
  "c",
  "c",
  "d",
  "d",
  "d",
  "d",
  "d",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "f",
  "f",
  "f",
  "g",
  "g",
  "g",
  "g",
  "h",
  "h",
  "h",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "j",
  "k",
  "l",
  "l",
  "l",
  "l",
  "l",
  "m",
  "m",
  "m",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "o",
  "o",
  "o",
  "o",
  "o",
  "o",
  "o",
  "o",
  "o",
  "o",
  "p",
  "p",
  "p",
  "q",
  "r",
  "r",
  "r",
  "r",
  "r",
  "r",
  "r",
  "s",
  "s",
  "s",
  "s",
  "s",
  "t",
  "t",
  "t",
  "t",
  "t",
  "t",
  "t",
  "u",
  "u",
  "u",
  "u",
  "u",
  "v",
  "v",
  "v",
  "w",
  "w",
  "w",
  "x",
  "y",
  "y",
  "y",
  "z",
];

const de: string[] = [
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "e",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "n",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "s",
  "i",
  "i",
  "i",
  "i",
  "i",
  "i",
  "r",
  "r",
  "r",
  "r",
  "r",
  "r",
  "t",
  "t",
  "t",
  "t",
  "t",
  "t",
  "u",
  "u",
  "u",
  "u",
  "u",
  "u",
  "a",
  "a",
  "a",
  "a",
  "a",
  "d",
  "d",
  "d",
  "d",
  "h",
  "h",
  "h",
  "h",
  "m",
  "m",
  "m",
  "m",
  "g",
  "g",
  "g",
  "l",
  "l",
  "l",
  "o",
  "o",
  "o",
  "c",
  "c",
  "f",
  "f",
  "k",
  "k",
  "b",
  "b",
  "w",
  "z",
  "p",
  "ä",
  "j",
  "ü",
  "v",
  "ö",
  "x",
  "q",
  "y",
];
