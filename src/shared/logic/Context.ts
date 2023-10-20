import { Dispatch, createContext } from "react";
import { WordGame, WordGameAction } from "./Types";

export const WordGameDispatchContext =
  createContext<Dispatch<WordGameAction> | null>(null);

export const WordGameContext = createContext<WordGame | null>(null);
