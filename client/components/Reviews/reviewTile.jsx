import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

function ReviewTile({ productOverviewId }) {
  const [showMore, setMore] = useState(false);
  const [reviewsData, setReviews] = useState([]);
  const [count, setCount] = useState('');

  const getData = () => axios.get('/reviews', { params: { id: productOverviewId } })
    .then(({ data }) => {
      setReviews(data.results);
      setCount(data.count);
    })
    .catch((err) => {
      console.log('metadata error', err);
    });

  console.log(reviewsData.slice(0, 2));

  useEffect(() => {
    getData();
  }, [productOverviewId]);

  return (
    <div style={tileBox}>
      <ul>
        {showMore
          ? reviewsData.map((review) =>
            <ReviewIndividualTile key={review.review_id} review={review} />)
          : reviewsData.slice(0, 2).map((review) =>
            <ReviewIndividualTile key={review.review_id} review={review} />)}
      </ul>
      {count > 2
        ? (<button type="button" onClick={() => setMore(true)} style={{ margin: '1.5em', position: 'relative', left: '16px', fontSize: '20px' }}>
        More Reviews
      </button>) : null}
      <br />
      <AddReview />
    </div>
  );
}

export default ReviewTile;
