import { useEffect, useState } from 'react';
import styled from 'styled-components';

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
  const [localQueryString, setLocalQueryString] = useState(queryString);

  const StyledInput = styled.input`
    margin: 0.5rem;
  `;

  const StyledSelect = styled.select`
    margin: 0.5rem;
  `;

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>
          Search todos:
          <StyledInput
            type="text"
            value={localQueryString}
            onChange={(e) => setLocalQueryString(e.target.value)}
          />
        </label>
        <button type="button" onClick={() => setLocalQueryString('')}>
          Clear
        </button>
      </div>
      <div>
        <label htmlFor="sortBy">
          Sort by:
          <StyledSelect
            name="sortBy"
            id="sortBy"
            onChange={(event) => setSortField(event.target.value)}
            value={sortField}
          >
            <option value="title">Title</option>
            <option value="createdTime">Time Added</option>
          </StyledSelect>
        </label>
        <label htmlFor="sortDirection">
          Direction:
          <StyledSelect
            name="direction"
            id="direction"
            onChange={(event) => setSortDirection(event.target.value)}
            value={sortDirection}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </StyledSelect>
        </label>
      </div>
    </form>
  );
}
export default TodosViewForm;
