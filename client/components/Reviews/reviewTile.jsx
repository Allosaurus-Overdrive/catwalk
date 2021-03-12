import React, { useState } from 'react';
// import axios from 'axios';
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
  fontSize: '16px',
};

function ReviewTile({
  reviewsData, count, productOverviewId, getData, clickTracker,
}) {
  const [showMore, setMore] = useState(false);

  function showMoreReviews() {
    setMore(true);
    clickTracker(`product id: ${productOverviewId}`, 'Ratings & Reviews/More Reviews');
  }

  return (
    <div style={tileBox}>
      <ul>
        <li style={{ listStyleType: 'none' }}>
          {showMore
            ? reviewsData.map((review) => <ReviewIndividualTile key={review.review_id} review={review} clickTracker={clickTracker} />)
            : reviewsData.slice(0, 2).map((review) => <ReviewIndividualTile key={review.review_id} review={review} clickTracker={clickTracker} />)}
        </li>
      </ul>
      {count > 2
        ? (
          <button
            type="button"
            onClick={showMoreReviews}
            style={{
              margin: '1.5em',
              position: 'relative',
              left: '16px',
              border: '1px solid darkslategray',
              fontSize: '12px',
              padding: '15px',
              backgroundColor: 'white',
              fontWeight: '600',
              outline: 'none',
            }}
          >
            MORE REVIEWS
          </button>
        ) : null}
      <br />
      <AddReview
        productOverviewId={productOverviewId}
        getData={getData}
        clickTracker={clickTracker}
      />
    </div>
  );
}

export default ReviewTile;
