import React from 'react';
import ReviewTile from './reviewTile';

function Reviews() {
  return (
    <div>
      <div>
        Rating Section
      </div>
      <div>
        Product Breakdown
      </div>
      <form style={{ float: 'center', fontSize: '18px' }}>
        <label className="review-sort"><strong>x Number of Reviews Sorted By</strong> </label>
        <select id="search-select">
          <option value="relevance">Relevance</option>
          <option value="helpfulness">Helpful</option>
          <option value="newest">Newest</option>
        </select>
      </form>
      <ReviewTile />
    </div>
  );
}

export default Reviews;
