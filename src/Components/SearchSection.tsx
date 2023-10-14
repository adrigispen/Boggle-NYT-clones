import { useContext } from "react";
import { BoggleGame, SearchProps } from "./Types";
import { BoggleContext } from "../logic/BoggleContext";

export const SearchSection: React.FC<SearchProps> = ({ onSubmit }) => {
  const game = useContext(BoggleContext) as BoggleGame;
  const playerData = game.playersData[game.currentPlayer];

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.currentTarget.search.value, playerData);
          e.currentTarget.reset();
        }}
      >
        <div className="search">
          <input name="search" />
          <button className="searchBtn" type="submit">
            🔎
          </button>
        </div>
      </form>
      <div>{game.error && <label className="error">{game.error}</label>}</div>
    </>
  );
};
