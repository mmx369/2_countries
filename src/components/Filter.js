import React from 'react';

const Filter = ({ newSearch, handleNameSearch }) => {
  return (
    <div>
      find countries: <input value={newSearch} onChange={handleNameSearch} />
    </div>
  );
};
export default Filter;