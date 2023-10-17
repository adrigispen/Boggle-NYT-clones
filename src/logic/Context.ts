import { Dispatch, createContext } from "react";
import { BoggleAction, BoggleGame } from "../shared/logic/Types";

export const BoggleContext = createContext<BoggleGame | null>(null);
export const BoggleDispatchContext =
  createContext<Dispatch<BoggleAction> | null>(null);
