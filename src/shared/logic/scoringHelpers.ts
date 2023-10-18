import { PlayerData } from "./Types";

export function initializePlayersData(players: string[]): PlayerData[] {
  const wordsFound: string[] = [];
  return players.map((p) => ({
    playerName: p,
    wordsFound,
    currentScore: 0,
  }));
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

export function getNextPlayer(
  speedMode: boolean,
  currentPlayer: number,
  playersData: PlayerData[]
): number {
  return speedMode
    ? (currentPlayer + 1) % playersData.length
    : currentPlayer < playersData.length - 1
    ? currentPlayer + 1
    : -1;
}
