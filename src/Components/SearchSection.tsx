import { SearchProps } from "./Types";

export const SearchSection: React.FC<SearchProps> = ({ onSubmit, error }) => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e);
          onSubmit(e.currentTarget.search.value);
          e.currentTarget.reset();
        }}
      >
        <label>
          Search for words
          <input name="search" />
          <button type="submit">🔎</button>
        </label>
        {error && <label className="error">{error}</label>}
      </form>
    </>
  );
};
