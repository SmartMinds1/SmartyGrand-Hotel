//creating a search component
const SearchBox = ({ search, setSearch }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="searchBox">
      <input
        type="text"
        role="searchbox"
        id="mySearchBox"
        placeholder="Search User"
        size={30}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBox;
