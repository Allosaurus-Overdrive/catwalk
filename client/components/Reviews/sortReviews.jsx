import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SortReviews({ productOverviewId }) {
  const [count, setCount] = useState('');
  // const [sortId, setSortId] = useState('relevant');
  const getData = () => axios.get('/reviews', { params: { id: productOverviewId } })
    .then(({ data }) => {
      setCount(data.results.length);
    })
    .catch((err) => {
      console.log('metadata error', err);
    });

  console.log(count);

  useEffect(() => {
    getData();
  }, [productOverviewId]);

  return (
    <div>
      <label htmlFor="review-sort">
        <strong>
          {count}
          {' '}
          reviews, sorted by
          {' '}
        </strong>
      </label>
      <select id="search-select">
        <option value="relevant">relevant</option>
        <option value="helpful">helpful</option>
        <option value="newest">newest</option>
      </select>
    </div>
  );
}

export default SortReviews;
