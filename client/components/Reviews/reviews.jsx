import React from 'react';
import ReviewTile from './reviewTile';
import Characteristics from './productBreakdown';
import Ratings from './ratingBreakdown';

function Reviews() {
  return (
    <fragment>
      RATINGS and REVIEWS
      <br />
      <br />
      <br />
      <Ratings />
      <Characteristics />
      <div style={{ float: 'center', fontSize: '18px' }}>
        <label htmlFor="review-sort">
          <strong>
            x Number of Reviews Sorted By
          </strong>
        </label>
        <select id="search-select">
          <option value="relevance">Relevance</option>
          <option value="helpfulness">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </div>
      <ReviewTile />
    </fragment>
  );
}

export default Reviews;
