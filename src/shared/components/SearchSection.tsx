import { SearchProps } from "../logic/Types";

export const SearchSection: React.FC<SearchProps> = ({
  onSubmit,
  error,
  playerData,
  playing,
}) => {
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
