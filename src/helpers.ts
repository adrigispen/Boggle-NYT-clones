import { LetterSquare } from "./components/Types";

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

export function findWord(
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
      const newSelectionGrid = Array(grid.length)
        .fill(false)
        .map(() => Array(grid.length).fill(false));
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

const en_US_16_die: string[] = [
  "RIFOBX",
  "IFEHEY",
  "DENOWS",
  "UTOKND",
  "HMSRAO",
  "LUPETS",
  "ACITOA",
  "YLGKUE",
  "QBMJOA",
  "EHISPN",
  "VETIGN",
  "BALIYT",
  "EZAVND",
  "RALESC",
  "UWILRG",
  "PACEMD",
];

const en_US_25_die: string[] = [
  "QBZJXL",
  "TOUOTO",
  "OVWRGR",
  "AAAFSR",
  "AUMEEG",
  "HHLRDO",
  "NHDTHO",
  "LHNROD",
  "AFAISR",
  "YIFASR",
  "TELPCI",
  "SSNSEU",
  "RIYPRH",
  "DORDLN",
  "CCWNST",
  "TTOTEM",
  "SCTIEP",
  "EANDNN",
  "MNNEAG",
  "UOTOWN",
  "AEAEEE",
  "YIFPSR",
  "EEEEMA",
  "ITITIE",
  "ETILIC",
];

const de_16_die: string[] = [
  "TDSNOE",
  "LRBTAI",
  "LARESC",
  "IOAATE",
  "ABOJQM",
  "XRIFOA",
  "OIASMR",
  "INERHS",
  "INEGVT",
  "SUTEPL",
  "ECAPMD",
  "RUEILW",
  "UTOKEN",
  "LGNYEU",
  "HEFSIE",
  "AZEVND",
];

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

export const ponsApiSecret =
  "f06f4cec449369eee1abc5fa987dbf35e421d03b4f772bd42fc531bd6af95bde";
