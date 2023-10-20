import { useRef } from "react";
import { SearchProps } from "../logic/Types";

export const SearchSection: React.FC<SearchProps> = ({
  onSubmit,
  error,
  playerData,
  playing,
  clearError,
}) => {
  const ref = useRef<number | null>(null);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e.currentTarget.search.value, playerData);
          e.currentTarget.reset();
          ref.current = setTimeout(clearError, 1000);
        }}
      >
        <div className="search">
          <input className="searchBar" name="search" disabled={!playing} />
          <button className="searchBtn" type="submit" disabled={!playing}>
            🔎
          </button>
        </div>
      </form>
      <div>{error && <label className="error">{error}</label>}</div>
    </>
  );
};
