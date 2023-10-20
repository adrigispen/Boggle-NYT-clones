import { Dispatch, createContext } from "react";
import {
  BoggleAction,
  BoggleGame,
  SpellingBeeAction,
  SpellingBeeGame,
} from "./Types";

export const BoggleContext = createContext<BoggleGame | null>(null);
export const BoggleDispatchContext =
  createContext<Dispatch<BoggleAction> | null>(null);

export const SpellingBeeContext = createContext<SpellingBeeGame | null>(null);
export const SpellingBeeDispatchContext =
  createContext<Dispatch<SpellingBeeAction> | null>(null);
