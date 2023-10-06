import React from "react";
import { StartGameButtonProps } from "./Settings.types";

export const StartGameButton: React.FC<StartGameButtonProps> = ({
  names,
  boardSize,
  generousMode,
  speedMode,
}) => {
  const namesDisplay = names.map((name) => <li>{name}</li>);

  return (
    <>
      <ul>{namesDisplay}</ul>
      <h2>{boardSize}</h2>
      <h3>{generousMode}</h3>
      <h3>{speedMode}</h3>
    </>
  );
};
