import { SearchProps } from "./Types";

export const SearchSection: React.FC<SearchProps> = ({
  currentSearch,
  setCurrentSearch,
  handleSearch,
  error,
}) => {
  function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <>
      <label>
        Search for words
        <input
          name="search"
          value={currentSearch}
          onChange={(e) => setCurrentSearch(e.target.value)}
          onKeyDown={(e) => handleEnter(e)}
        />
        <button onClick={handleSearch}>🔎</button>
      </label>
      {error && <label className="error">{error}</label>}
    </>
  );
};
