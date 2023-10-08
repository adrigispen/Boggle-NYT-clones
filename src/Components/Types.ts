export interface GridProps {
  grid: string[][];
  setGrid: (grid: string[][]) => void;
  selectionGrid: boolean[][];
  setSelectionGrid: (grid: boolean[][]) => void;
}

export interface LetterSquare {
  row: number;
  col: number;
  letter: string;
}

export interface LetterSquareProps extends LetterSquare {
  selected: boolean | undefined;
}

export interface SettingsProps {
  settingsData: {
    players: string[];
    size: number;
    language: string;
    generousMode: boolean;
    speedMode: boolean;
  };
  setSettingsData: (settingsData: {
    players: string[];
    size: number;
    language: string;
    generousMode: boolean;
    speedMode: boolean;
  }) => void;
}

export interface PlayerData {
  playerName: string;
  currentSearch: string;
  wordsFound: string[];
  currentScore: number;
}

export interface SettingsModalProps {
  isOpen: boolean;
  children: JSX.Element[];
}

export interface Entry {
  word: string;
}
