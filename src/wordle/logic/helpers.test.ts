import { GuessStatus } from "../../shared/logic/Types";
import { getGuessStatus } from "./helpers";

let grid = [
  ["T", "E", "A", "R", "S"],
  ["M", "A", "N", "O", "R"],
  ["S", "T", "A", "L", "E"],
  ["P", "E", "T", "T", "Y"],
  ["M", "E", "S", "S", "Y"],
];
let answer = "SLATE";

describe("getGuessStatus - slate", () => {
  it("returns yellow for wrong position in the simple case (no correct letters)", () => {
    const color = getGuessStatus(grid, 1, 1, "A", answer);
    console.log(color);
    expect(color).toBe(GuessStatus.WRONG_POSITION);
  });

  it("returns yellow for wrong position when there are correct letters", () => {
    const color1 = getGuessStatus(grid, 0, 0, "T", answer);
    const color2 = getGuessStatus(grid, 0, 1, "E", answer);
    const color3 = getGuessStatus(grid, 0, 4, "S", answer);
    const color4 = getGuessStatus(grid, 0, 2, "A", answer);
    console.log(color1, color2, color3, color4);
    expect(color1).toBe(GuessStatus.WRONG_POSITION);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
    expect(color3).toBe(GuessStatus.WRONG_POSITION);
    expect(color4).toBe(GuessStatus.CORRECT);
  });
  it("returns grey for incorrect if the letter is in the word, but already in the correct position", () => {
    const color = getGuessStatus(grid, 3, 2, "T", answer);
    console.log(color);
    expect(color).toBe(GuessStatus.INCORRECT);
  });
  it("returns grey for incorrect for the second instance of a letter that is in the wrong position", () => {
    const color1 = getGuessStatus(grid, 4, 3, "S", answer);
    const color2 = getGuessStatus(grid, 4, 2, "S", answer);
    console.log(color1, color2);
    expect(color1).toBe(GuessStatus.INCORRECT);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
  });
});

grid = [
  ["M", "A", "N", "O", "R"],
  ["A", "O", "R", "T", "A"],
  ["A", "B", "O", "R", "T"],
  ["A", "F", "O", "O", "T"],
];
answer = "AFOOT";

describe("getGuessStatus - afoot", () => {
  it("returns yellow for wrong position when there are correct letters", () => {
    const color1 = getGuessStatus(grid, 0, 1, "A", answer);
    const color2 = getGuessStatus(grid, 0, 3, "O", answer);
    console.log(color1, color2);
    expect(color1).toBe(GuessStatus.WRONG_POSITION);
    expect(color2).toBe(GuessStatus.CORRECT);
  });
  it("returns grey for incorrect if the letter is in the word, but already in the correct position", () => {
    const color = getGuessStatus(grid, 1, 4, "A", answer);
    console.log(color);
    expect(color).toBe(GuessStatus.INCORRECT);
  });
  it("returns green for correct for the second instance of a letter that is in the correct position", () => {
    const color1 = getGuessStatus(grid, 3, 2, "O", answer);
    const color2 = getGuessStatus(grid, 3, 3, "O", answer);
    console.log(color1, color2);
    expect(color1).toBe(GuessStatus.CORRECT);
    expect(color2).toBe(GuessStatus.CORRECT);
  });
});
