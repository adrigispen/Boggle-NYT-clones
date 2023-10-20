import { Dispatch, createContext } from "react";
import { WordGameAction } from "./Types";

export const WordGameDispatchContext =
  createContext<Dispatch<WordGameAction> | null>(null);
