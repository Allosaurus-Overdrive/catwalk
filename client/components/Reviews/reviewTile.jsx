import React from 'react';
// import axios from 'axios';
import exampleReviews from './sampleData';
import ReviewIndividualTile from './reviewIndividualTile';

const tileBox = {
  border: '1px solid black',
  margin: '2em',
};

function ReviewTile() {
  return (
    <div style={tileBox}>
      <ul>
        {exampleReviews.results.map((review) => (
          <ReviewIndividualTile key={review.review_id} review={review} />
        ))}
      </ul>
      <button type="button">
        More Reviews
      </button>
      <button type="button">
        Add Review
      </button>
    </div>
  );
}

export default ReviewTile;

// use toggle function to display 2 vs all reviews, maybe have to use count or limit?
// modal component for add review
/* for each tile, access
-Star Rating
-Date of Review
-Review Summary(60 chars and in bold)
-Review Body
-Recommend
-Reviewer name
-Response to Review
-Rating Helpfulness
*/
