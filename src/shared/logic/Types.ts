export interface LetterSquare {
  row: number;
  col: number;
  letter: string;
}

export enum GuessStatus {
  CORRECT = "green",
  WRONG_POSITION = "yellow",
  INCORRECT = "grey",
  OPEN = "white",
}

export interface GuessSlot {
  row: number;
  col: number;
  letter: string;
  color: GuessStatus;
}

export interface WordleProps {
  grid: string[][];
  answer: string;
}

export interface FinalScoresProps {
  playersData: PlayerData[];
}

export interface GridProps {
  grid: string[][];
  selectionGrid: boolean[][];
}

export interface LetterSquareProps extends LetterSquare {
  selected: boolean | undefined;
}

export interface SettingsProps {
  gameName: string;
  onGameStart: (
    language: string,
    players: string[],
    speedMode: boolean,
    generousMode?: boolean,
    size?: number
  ) => void;
  setShowSettings: (value: boolean) => void;
  playerNames: string[];
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

export interface SearchProps {
  onSubmit: (currentSearch: string, playerData: PlayerData) => void;
  error: string;
  playerData: PlayerData;
  playing: boolean;
  clearError: () => void;
}

export enum WordGameType {
  BOGGLE = "BOGGLE",
  SPELLINGBEE = "SPELLINGBEE",
  WORDLE = "WORDLE",
}

export interface WordGame {
  playersData: PlayerData[];
  error: string;
  playing: boolean;
  currentPlayer: number;
  speedMode: boolean;
  language: string;
}

export interface WordleGame extends WordGame {
  type: WordGameType.WORDLE;
  grid: string[][];
  answer: string;
}

export interface BoggleGame extends WordGame {
  type: WordGameType.BOGGLE;
  size: number;
  generousMode: boolean;
  grid: string[][];
  selectionGrid: boolean[][];
}

export interface SpellingBeeGame extends WordGame {
  type: WordGameType.SPELLINGBEE;
  centerLetter: string;
  edgeLetters: string[];
}

export enum WordGameActionType {
  TURN_ENDED = "TURN_ENDED",
  GAME_ENDED = "GAME_ENDED",
  ERROR_CLEARED = "ERROR_CLEARED",
  WORD_SEARCHED = "WORD_SEARCHED",
  GAME_STARTED = "GAME_STARTED",
  BOARD_UPDATED = "UPDATE_BOARD",
  SHUFFLED = "SHUFFLED",
}

export type WordGameAction =
  | {
      type: WordGameActionType.TURN_ENDED | WordGameActionType.ERROR_CLEARED;
    }
  | {
      type: WordGameActionType.GAME_ENDED;
      payload: GameEndedPayload;
    }
  | {
      type: WordGameActionType.WORD_SEARCHED;
      payload: SearchResultPayload;
    }
  | {
      type: WordGameActionType.GAME_STARTED;
      payload: NewGamePayload;
    }
  | {
      type: WordGameActionType.BOARD_UPDATED;
      payload: WordFoundPayload;
    }
  | {
      type: WordGameActionType.SHUFFLED;
      payload: SpellingBeeShufflePayload;
    };

export interface SearchResultPayload {
  error: string;
  playerData: PlayerData;
}

export interface GameEndedPayload {
  allWords: PlayerData;
}

export interface WordFoundPayload {
  selectionGrid: boolean[][];
}

export interface NewGamePayload {
  game: BoggleGame | SpellingBeeGame;
}

export interface SpellingBeeShufflePayload {
  edgeLetters: string[];
}

export interface BeeBoardProps {
  edgeLetters: string[];
  centerLetter: string;
  playing: boolean;
}

export type Entry = {
  word: string;
};

export type dwdsEntry = {
  lemma: string;
};

export type TypoModified = {
  dictionaryTable: Record<string, string[][]>;
};
