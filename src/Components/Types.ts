export interface LetterSquare {
  row: number;
  col: number;
  letter: string;
}

export interface FinalScoresProps {
  playersData: PlayerData[];
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
  handleGameStart: (language: string, players: string[]) => void;
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
      payload: SearchResultPayload;
    }
  | {
      type: BoggleActionType.TURN_ENDED;
    };

export interface SearchResultPayload {
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

export interface SpellingBeeGame {
  language: string;
  centerLetter: string;
  edgeLetters: string[];
  playersData: PlayerData[];
  error: string;
  currentPlayer: number;
  playing: boolean;
}

export enum SpellingBeeActionType {
  GAME_STARTED = "GAME_STARTED",
  WORD_SEARCHED = "WORD_SEARCHED",
  TURN_ENDED = "TURN_ENDED",
  SHUFFLE = "SHUFFLE",
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
      type: SpellingBeeActionType.TURN_ENDED;
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
}

export interface BoardProps {
  edgeLetters: string[];
  centerLetter: string;
  shuffleEdgeLetters: () => void;
  getNewBoard: () => void;
}
