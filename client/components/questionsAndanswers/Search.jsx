/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchBar = styled.input`
height: 30px;
width: 500px;
border-style: solid;
border-color: black;
border-width: thin;
`;

export default function Search(props) {
  const { submitSearch, searchTerm, string } = props;

  return (
    <form onSubmit={submitSearch}>
      <label htmlFor="questions">
        <SearchBar
          id="questions"
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          onChange={searchTerm}
          value={string}
        />
      </label>
      <label>
        <button type="submit"><i className="fas fa-search icon 9x" /></button>
      </label>
    </form>
  );
}

Search.propTypes = {
  submitSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.func.isRequired,
  string: PropTypes.string.isRequired,
};
