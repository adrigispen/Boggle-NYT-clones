import { Dispatch, createContext } from "react";
import { BoggleGame, SpellingBeeGame, WordGameAction } from "./Types";

export const WordGameDispatchContext =
  createContext<Dispatch<WordGameAction> | null>(null);

export const WordGameContext = createContext<
  SpellingBeeGame | BoggleGame | null
>(null);
