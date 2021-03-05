import React from 'react';
import { FaStar } from 'react-icons/fa';
import metaData from './sampleRatingsData';

function StarRating() {
  const yes = Number(metaData.recommended.true);
  const no = Number(metaData.recommended.false);
  const total = yes + no;
  const scores = metaData.ratings;
  const sum = 1 * (Number(scores['1'])) + 2 * (Number(scores['2'])) + 3 * (Number(scores['3'])) + 4 * (Number(scores['4'])) + 5 * (Number(scores['5']));
  const weightedAvg = (sum / total);
  const avgRating = Number((weightedAvg).toFixed(1));

  return (
    <div>
      {[...Array(5)].map((star, i) => (
        <label key={i}>
          <FaStar size={20} color={avgRating > i ? '#ffc107' : 'lightgrey'} />
        </label>
      ))}
    </div>
  );
}

export default StarRating;
