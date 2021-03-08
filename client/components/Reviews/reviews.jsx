import React from 'react';
import styled from 'styled-components';
import ReviewTile from './reviewTile';
import Characteristics from './productBreakdown';
import Ratings from './ratingBreakdown';
import SortReviews from './sortReviews';

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

function Reviews({ productOverviewId }) {
  return (
    //  <h3>RATINGS and REVIEWS</h3>
    <GridLayout>
      <RatingsStyle><Ratings productOverviewId={productOverviewId} /></RatingsStyle>
      <CharStyle><Characteristics productOverviewId={productOverviewId} /></CharStyle>
      <SortStyle>
        <SortReviews productOverviewId={productOverviewId} />
      </SortStyle>
      <ReviewStyle><ReviewTile productOverviewId={productOverviewId} /></ReviewStyle>
    </GridLayout>
  );
}

export default Reviews;
