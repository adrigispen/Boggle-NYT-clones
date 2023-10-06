export type GridProps = {
  grid: string[][];
  setGrid: (grid: string[][]) => void;
};

export type LetterSquareProps = {
  row: number;
  col: number;
  letter: string;
};

export type SettingsProps = {
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
};
