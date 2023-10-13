import { useContext } from "react";
import { BoggleGame, SearchProps } from "./Types";
import { BoggleContext } from "../services/BoggleContext";

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
        <label>
          Search for words
          <input name="search" />
          <button type="submit">🔎</button>
        </label>
        {game.error && <label className="error">{game.error}</label>}
      </form>
    </>
  );
};
