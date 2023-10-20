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
}

export interface LetterSquareProps extends LetterSquare {
  selected: boolean | undefined;
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
}

export interface WordGame {
  type: WordGameType;
  playersData: PlayerData[];
  error: string;
  playing: boolean;
  currentPlayer: number;
  speedMode: boolean;
  language: string;
  size: number;
  generousMode: boolean;
  grid: string[][];
  selectionGrid: boolean[][];
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
      type:
        | WordGameActionType.TURN_ENDED
        | WordGameActionType.GAME_ENDED
        | WordGameActionType.ERROR_CLEARED;
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

// export interface BoggleGame extends WordGame {
//   size: number;
//   generousMode: boolean;
//   grid: string[][];
//   selectionGrid: boolean[][];
// }

export interface SearchResultPayload {
  error: string;
  playerData: PlayerData;
}

export interface WordFoundPayload {
  selectionGrid: boolean[][];
}

export interface NewGamePayload {
  size?: number;
  generousMode?: boolean;
  language?: string;
  speedMode?: boolean;
  playersData?: PlayerData[];
}

// export interface SpellingBeeGame extends WordGame {
//   centerLetter: string;
//   edgeLetters: string[];
// }

export interface SpellingBeeShufflePayload {
  edgeLetters: string[];
}

export interface BeeBoardProps {
  edgeLetters: string[];
  centerLetter: string;
  playing: boolean;
}
