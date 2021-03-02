import React, { useState } from 'react';
import ReviewTile from './reviewTile';

const Reviews = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div>
        {count}
        reviews, sorted by
      </div>
      <div> Rating Section </div>
      <div>
        Product Breakdown
      </div>
      <ReviewTile />
      <button type="button" onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default Reviews;
