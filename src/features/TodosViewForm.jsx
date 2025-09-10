function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) {
  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>
          Search todos:
          <input
            type="text"
            value={queryString}
            onChange={(e) => setQueryString(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => setQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <label htmlFor="sortBy">
          Sort by:
          <select
            name="sortBy"
            id="sortBy"
            onChange={(event) => setSortField(event.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </select>
        </label>
        <label htmlFor="sortDirection">
          Direction:
          <select
            name="direction"
            id="direction"
            onChange={(event) => setSortDirection(event.target.value)}
            value={sortDirection}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
    </form>
  );
}
export default TodosViewForm;
