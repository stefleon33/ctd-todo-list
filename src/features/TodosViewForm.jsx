import { useEffect, useState } from 'react';

function TodosViewForm({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
}) {
  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <form onSubmit={preventRefresh}>
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
