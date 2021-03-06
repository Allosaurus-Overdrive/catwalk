import React from 'react';
import styled from 'styled-components';
import ReviewTile from './reviewTile';
import Characteristics from './productBreakdown';
import Ratings from './ratingBreakdown';
import metaData from './sampleRatingsData';

const yes = Number(metaData.recommended.true);
const no = Number(metaData.recommended.false);
const totalNumber = yes + no;

const GridLayout = styled.div`
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
`;

const RatingsStyle = styled.div`
  grid-row: 1;
  grid-column: 1;
  position: relative;
  left: 50px;
`;

const CharStyle = styled.div`
  grid-row: 2;
  grid-column: 1;
  position: relative;
  left: 40px;
`;

const SortStyle = styled.div`
  font-size: 20px;
  position: relative;
  top: 25px;
  left: 400px;
  grid-row: 1;
  grid-column: 2;
`;
const ReviewStyle = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3 / 4;
`;

function Reviews() {
  return (
    //  <h3>RATINGS and REVIEWS</h3>
    <GridLayout>
      <RatingsStyle><Ratings /></RatingsStyle>
      <CharStyle><Characteristics /></CharStyle>
      <SortStyle>
        <div>
          <label htmlFor="review-sort">
            <strong>
              {totalNumber}
              {' '}
              reviews, sorted by
              {' '}
            </strong>
          </label>
          <select id="search-select">
            <option value="relevance">Relevance</option>
            <option value="helpfulness">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </SortStyle>
      <ReviewStyle><ReviewTile /></ReviewStyle>
    </GridLayout>
  );
}

export default Reviews;
