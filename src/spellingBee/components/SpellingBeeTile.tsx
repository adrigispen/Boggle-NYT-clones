import React from "react";

export const SpellingBeeTile: React.FC<{
  letter: string;
  center?: boolean;
}> = ({ letter, center }) => {
  const leftExtra = center === true ? " centerTileLeft" : "";
  const rightExtra = center === true ? " centerTileRight" : "";
  const extra = center === true ? " centerTile" : "";

  return (
    <div className="hex">
      <div className={`left${leftExtra}`}></div>
      <div className={`center${extra}`}>
        <span>{letter.toUpperCase()}</span>
      </div>
      <div className={`right${rightExtra}`}></div>
    </div>
  );
};
