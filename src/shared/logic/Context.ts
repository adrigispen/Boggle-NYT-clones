import { Dispatch, createContext } from "react";
import { BoggleAction, SpellingBeeAction } from "./Types";

export const BoggleDispatchContext =
  createContext<Dispatch<BoggleAction> | null>(null);

export const SpellingBeeDispatchContext =
  createContext<Dispatch<SpellingBeeAction> | null>(null);
