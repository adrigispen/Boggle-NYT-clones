import { SpellingBeeGame } from "../../shared/logic/Types";

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
