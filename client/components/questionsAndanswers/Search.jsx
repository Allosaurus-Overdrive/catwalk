import React from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
  const { submitSearch, searchTerm, string } = props;

  return (
    <form onSubmit={submitSearch}>
      <label htmlFor="questions">
        <input
          id="questions"
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={searchTerm}
          value={string}
        />
      </label>
      <input type="submit" value="magnifying glass" />
    </form>
  );
}

Search.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.func.isRequired,
  string: PropTypes.string.isRequired,
};
