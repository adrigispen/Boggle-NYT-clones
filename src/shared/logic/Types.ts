export interface LetterSquare {
  row: number;
  col: number;
  letter: string;
}

export interface FinalScoresProps {
  playersData: PlayerData[];
}

export interface GridProps {
  grid: string[][];
  selectionGrid: boolean[][];
  updateGrid: (selectionGrid: boolean[][]) => void;
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
  setShowSettings: (value: boolean) => void;
}

export interface SpellingBeeSettingsProps {
  handleGameStart: (
    language: string,
    players: string[],
    speedMode: boolean
  ) => void;
  setShowSettings: (value: boolean) => void;
  playerNames: string[];
}

export interface PlayerData {
  playerName: string;
  wordsFound: string[];
  currentScore: number;
}

export interface ScoreboardData {
  playerData: PlayerData;
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
  error: string;
  playerData: PlayerData;
  playing: boolean;
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
  GRID_UPDATED = "UPDATE_GRID",
  GAME_ENDED = "GAME_ENDED",
}

export type BoggleAction =
  | {
      type: BoggleActionType.GAME_STARTED;
      payload: NewGamePayload;
    }
  | {
      type: BoggleActionType.WORD_SEARCHED;
      payload: SearchResultPayload;
    }
  | {
      type: BoggleActionType.TURN_ENDED | BoggleActionType.GAME_ENDED;
    }
  | {
      type: BoggleActionType.GRID_UPDATED;
      payload: WordFoundPayload;
    };

export interface SearchResultPayload {
  error: string;
  playerData: PlayerData;
}

export interface WordFoundPayload {
  selectionGrid: boolean[][];
}

export interface NewGamePayload {
  size: number;
  language: string;
  speedMode: boolean;
  generousMode: boolean;
  playersData: PlayerData[];
}

export interface SpellingBeeGame {
  language: string;
  centerLetter: string;
  edgeLetters: string[];
  playersData: PlayerData[];
  error: string;
  currentPlayer: number;
  speedMode: boolean;
  playing: boolean;
}

export enum SpellingBeeActionType {
  GAME_STARTED = "GAME_STARTED",
  WORD_SEARCHED = "WORD_SEARCHED",
  TURN_ENDED = "TURN_ENDED",
  SHUFFLE = "SHUFFLE",
  GAME_ENDED = "GAME_ENDED",
}

export type SpellingBeeAction =
  | {
      type: SpellingBeeActionType.GAME_STARTED;
      payload: NewSpellingBeePayload;
    }
  | {
      type: SpellingBeeActionType.WORD_SEARCHED;
      payload: SpellingBeeSearchResultPayload;
    }
  | {
      type: SpellingBeeActionType.TURN_ENDED | SpellingBeeActionType.GAME_ENDED;
    }
  | {
      type: SpellingBeeActionType.SHUFFLE;
      payload: SpellingBeeShufflePayload;
    };

export interface SpellingBeeSearchResultPayload {
  error: string;
  playerData: PlayerData;
}

export interface SpellingBeeShufflePayload {
  edgeLetters: string[];
}

export interface NewSpellingBeePayload {
  language: string;
  playersData: PlayerData[];
  centerLetter: string;
  edgeLetters: string[];
  speedMode: boolean;
}

export interface BoardProps {
  edgeLetters: string[];
  centerLetter: string;
  shuffleEdgeLetters: () => void;
}