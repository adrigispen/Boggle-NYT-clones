export interface GridProps {
  grid: string[][];
  selectionGrid: boolean[][];
}

export interface LetterSquare {
  row: number;
  col: number;
  letter: string;
}

export interface LetterSquareProps extends LetterSquare {
  selected: boolean | undefined;
}

export interface SettingsData {
  size: number;
  language: string;
  generousMode: boolean;
  speedMode: boolean;
}

export interface SettingsProps {
  handleGameStart: (
    size: number,
    language: string,
    players: string[],
    speedMode: boolean,
    generousMode: boolean
  ) => void;
}

export interface PlayerData {
  playerName: string;
  wordsFound: string[];
  currentScore: number;
}

export interface ScoreboardData {
  endTurn: () => void;
}

export interface SettingsModalProps {
  isOpen: boolean;
  children: JSX.Element;
}

export interface Entry {
  word: string;
}

export interface dwdsEntry {
  lemma: string;
}

export interface SearchProps {
  onSubmit: (currentSearch: string, playerData: PlayerData) => void;
}

export interface BoggleGame {
  settings: SettingsData;
  playersData: PlayerData[];
  grid: string[][];
  selectionGrid: boolean[][];
  currentPlayer: number;
  error: string;
  playing: boolean;
}

export enum BoggleActionType {
  GAME_STARTED = "GAME_STARTED",
  WORD_SEARCHED = "WORD_SEARCHED",
  TURN_ENDED = "TURN_ENDED",
}

export type BoggleAction =
  | {
      type: BoggleActionType.GAME_STARTED;
      payload: NewGamePayload;
    }
  | {
      type: BoggleActionType.WORD_SEARCHED;
      payload: SearchPayload;
    }
  | {
      type: BoggleActionType.TURN_ENDED;
    };

export interface SearchPayload {
  selectionGrid: boolean[][];
  error: string;
  playerData: PlayerData;
}

export interface NewGamePayload {
  size: number;
  language: string;
  speedMode: boolean;
  generousMode: boolean;
  playersData: PlayerData[];
}
