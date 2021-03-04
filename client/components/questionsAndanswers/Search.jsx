import React, { useState } from 'react';

export default function Search() {
  const [search, setSearch] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    setSearch('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="questions">
        <input
          id="questions"
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </label>
      <input type="submit" value="magnifying glass" />
    </form>
  );
}
