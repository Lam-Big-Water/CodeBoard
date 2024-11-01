import React, { useReducer } from 'react';

// Action Types
const FILTER = 'FILTER';
const SORT = 'SORT';

// Reducer function to handle state changes
function listReducer(state, action) {
  switch (action.type) {
    case FILTER:
      // Filter the list based on the filter value
      return {
        ...state,
        filteredItems: state.items.filter(item => item.includes(action.payload.filterValue)),
      };
    case SORT:
      // Sort the list based on the sort direction
      const sortedItems = [...state.items].sort((a, b) => (
        action.payload.direction === 'ascending' ? a.localeCompare(b) : b.localeCompare(a)
      ));
      return {
        ...state,
        filteredItems: sortedItems,
      };
    default:
      return state;
  }
}

// Component using useReducer to manage list state
const ListManager = ({ initialItems }) => {
  const [state, dispatch] = useReducer(listReducer, {
    items: initialItems,
    filteredItems: initialItems,
  });

  // Function to handle filtering the list
  const filterList = filterValue => {
    dispatch({ type: FILTER, payload: { filterValue } });
  };

  // Function to handle sorting the list
  const sortList = direction => {
    dispatch({ type: SORT, payload: { direction } });
  };

  // Render list with buttons to trigger filtering and sorting
  return (
    <div>
      <input type="text" onChange={(e) => filterList(e.target.value)} placeholder="Filter list..." />
      <button onClick={() => sortList('ascending')}>Sort Ascending</button>
      <button onClick={() => sortList('descending')}>Sort Descending</button>
      <ul>
        {state.filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListManager;