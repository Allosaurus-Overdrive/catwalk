import React, { useState } from 'react';
// import axios from 'axios';
import exampleReviews from './sampleData';
import ReviewIndividualTile from './reviewIndividualTile';
import AddReview from './addReview';

const tileBox = {
  padding: '1em',
  position: 'relative',
  bottom: '300px',
  right: '33px',
  height: '1400px',
  width: '700px',
  overflowY: 'scroll',
  fontSize: '19px',
};

function ReviewTile() {
  const [showMore, setMore] = useState(false);

  return (
    <div style={tileBox}>
      <ul>
        {showMore
          ? exampleReviews.results.map((review) =>
            <ReviewIndividualTile key={review.review_id} review={review} />)
          : exampleReviews.results.slice(0, 2).map((review) =>
            <ReviewIndividualTile key={review.review_id} review={review} />)}
      </ul>
      <button type="button" onClick={() => setMore(true)} style={{ margin: '1.5em', position: 'relative', left: '16px', fontSize: '20px' }}>
        More Reviews
      </button>
      <br />
      <AddReview />
    </div>
  );
}

export default ReviewTile;
