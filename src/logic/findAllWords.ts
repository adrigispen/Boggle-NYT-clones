import { LetterSquare, PlayerData } from "../components/Types";
import { Typo } from "typo-js-ts";
import { score } from "./helpers";

const dictionary = new Typo("en_US");

dictionary.ready.then(() => {
  console.log("ready");
  console.log(dictionary.check("misspell"));
});

const initialClusters = `/^[bl | gl | pl | kl | br | dr | gr | pr | tr | kr | spl | spr | str | skr | sp | st | sk | sl | sm | sn | thr | fl | fr | sw | tw | skw | fy | shw | shm | phy | wh | ch | chr | ph | schl]/ ig`;

//const consonants = "bcdfghjklmnpqrstvwxy";
//const regexCs = `/[bcdfghjklmnpqrstvwxy]{0, 3}/`;

const vowels = new Set("AEIOUY".split(""));

const vowel = (char: string): boolean => vowels.has(char);

function validEnglishPrefix(word: string): boolean {
  if (word.length >= 2) {
    if (
      word.split("").some(vowel) ||
      word.match(initialClusters) ||
      word.match(/^[BCDFGHJKLMNPQRSTVWXYZ][AEIOUY]/)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return true;
}

export function findWords(grid: string[][]): PlayerData {
  let words: string[] = [];
  const gridList: LetterSquare[] = grid
    .map((row, rowi) =>
      row.map((char, i) => {
        return { row: rowi, col: i, letter: char };
      })
    )
    .flat();
  const queue: LetterSquare[][] = [];
  gridList.forEach((pos) => queue.push([pos]));
  while (queue.length < 1000000) {
    const path: LetterSquare[] | undefined = queue.shift();
    if (path === undefined || path === null) break;
    const word = path.map(({ letter }) => letter).join("");
    if (validEnglishPrefix(word)) {
      if (word.length > 2 && dictionary.check(word.toLowerCase()))
        words = [word.toLowerCase()].concat(words);
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
          path.filter((pos) => pos.row == t1 && pos.col == t2).length == 0
        ) {
          queue.push([...path, { row: t1, col: t2, letter: grid[t1][t2] }]);
        }
      });
    }
  }
  words = words.filter((word, index) => words.indexOf(word) === index);
  return {
    playerName: "BoggleBot",
    wordsFound: words,
    currentScore: words.reduce(
      (acc, cv) =>
        acc + (cv.length > 8 ? 11 : (score.get(cv.length) as number)),
      0
    ),
  };
}
