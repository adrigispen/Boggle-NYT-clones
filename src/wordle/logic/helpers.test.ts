import { GuessStatus } from "../../shared/logic/Types";
import { getGuessStatus } from "./helpers";

describe("getGuessStatus - slate", () => {
  it("returns yellow for wrong position in the simple case (no correct letters)", () => {
    const color = getGuessStatus("MANOR", 1, "SLATE");
    expect(color).toBe(GuessStatus.WRONG_POSITION);
  });

  it("returns yellow for wrong position when there are correct letters", () => {
    const color1 = getGuessStatus("TEARS", 0, "SLATE");
    const color2 = getGuessStatus("TEARS", 1, "SLATE");
    const color3 = getGuessStatus("TEARS", 4, "SLATE");
    const color4 = getGuessStatus("TEARS", 2, "SLATE");
    expect(color1).toBe(GuessStatus.WRONG_POSITION);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
    expect(color3).toBe(GuessStatus.WRONG_POSITION);
    expect(color4).toBe(GuessStatus.CORRECT);
  });
  it("returns grey for incorrect if the letter is in the word, but already in the correct position", () => {
    const color = getGuessStatus("PETTY", 2, "SLATE");
    expect(color).toBe(GuessStatus.INCORRECT);
  });
  it("returns grey for incorrect for the second instance of a letter that is in the wrong position", () => {
    const color1 = getGuessStatus("MESSY", 3, "SLATE");
    const color2 = getGuessStatus("MESSY", 2, "SLATE");
    expect(color1).toBe(GuessStatus.INCORRECT);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
  });
});

describe("getGuessStatus - afoot", () => {
  it("returns yellow for wrong position when there are correct letters", () => {
    const color1 = getGuessStatus("MANOR", 1, "AFOOT");
    const color2 = getGuessStatus("MANOR", 3, "AFOOT");
    expect(color1).toBe(GuessStatus.WRONG_POSITION);
    expect(color2).toBe(GuessStatus.CORRECT);
  });
  it("returns grey for incorrect if the letter is in the word, but already in the correct position", () => {
    const color = getGuessStatus("AORTA", 4, "AFOOT");
    expect(color).toBe(GuessStatus.INCORRECT);
  });
  it("returns green for correct for the second instance of a letter that is in the correct position", () => {
    const color1 = getGuessStatus("AFOOT", 2, "AFOOT");
    const color2 = getGuessStatus("AFOOT", 3, "AFOOT");
    expect(color1).toBe(GuessStatus.CORRECT);
    expect(color2).toBe(GuessStatus.CORRECT);
  });
});

describe("getGuessStatus - abort", () => {
  it("returns yellow for wrong position when there are correct letters", () => {
    const color1 = getGuessStatus("MANOR", 1, "ABORT");
    const color2 = getGuessStatus("MANOR", 3, "ABORT");
    const color3 = getGuessStatus("MANOR", 4, "ABORT");
    expect(color1).toBe(GuessStatus.WRONG_POSITION);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
    expect(color3).toBe(GuessStatus.WRONG_POSITION);
  });
  it("returns grey for incorrect if the letter is in the word, but already in the correct position", () => {
    const color1 = getGuessStatus("AORTA", 4, "ABORT");
    const color2 = getGuessStatus("AORTA", 2, "ABORT");
    const color3 = getGuessStatus("AORTA", 3, "ABORT");
    expect(color1).toBe(GuessStatus.INCORRECT);
    expect(color2).toBe(GuessStatus.WRONG_POSITION);
    expect(color3).toBe(GuessStatus.WRONG_POSITION);
  });
  it("returns grey for incorrect for the second instance of a letter that is in the correct position", () => {
    const color1 = getGuessStatus("AFOOT", 2, "ABORT");
    const color2 = getGuessStatus("AFOOT", 3, "ABORT");
    expect(color1).toBe(GuessStatus.CORRECT);
    expect(color2).toBe(GuessStatus.INCORRECT);
  });
});
