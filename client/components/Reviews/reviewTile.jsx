import React, { useState } from 'react';
// import axios from 'axios';
import exampleReviews from './sampleData';
import ReviewIndividualTile from './reviewIndividualTile';
import AddReview from './addReview';

const tileBox = {
  border: '1px solid black',
  float: 'center',
  margin: '2em',
  height: '400px',
  width: '700px',
  overflowY: 'scroll',
};

function ReviewTile() {
  const [showMore, setMore] = useState(false);

  return (
    <div style={tileBox}>
      <ul>
        {showMore
          ? exampleReviews.results.map((review) => <ReviewIndividualTile key={review.review_id} review={review} />)
          : exampleReviews.results.slice(0, 2).map((review) => <ReviewIndividualTile key={review.review_id} review={review} />)}
      </ul>
      <button type="button" onClick={() => setMore(true)} style={{ margin: '1.5em' }}>
        More Reviews
      </button>
      <br />
      <AddReview />
    </div>
  );
}

export default ReviewTile;
