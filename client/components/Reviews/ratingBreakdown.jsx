/* eslint-disable no-restricted-syntax */
import React from 'react';
import metaData from './sampleRatingsData';
import ProgressBar from './progressBar';
import StarRating from './StarRating';

function Ratings() {
  // calculating percent of recommendations
  const yes = Number(metaData.recommended.true);
  const no = Number(metaData.recommended.false);
  const total = yes + no;
  const percent = Math.round((yes / total) * 100);

  // calculating average rating for product
  const scores = metaData.ratings;
  const sum = 1 * (Number(scores['1'])) + 2 * (Number(scores['2'])) + 3 * (Number(scores['3'])) + 4 * (Number(scores['4'])) + 5 * (Number(scores['5']));
  const weightedAvg = (sum / total);
  const avgRating = Number((weightedAvg).toFixed(1));

  const indiRatings = Object.values(scores);
  console.log(indiRatings);
  // calculate and create new array for average rating for each star display
  const starPercentArray = [];
  for (const score in scores) {
    const starValue = Number(scores[score]);
    const starPercent = Math.round((starValue / total) * 100);
    starPercentArray.push(starPercent);
  }

  return (
    <div style={{ fontSize: '15px', fontWeight: '1em', display: 'inline' }}>
      <span style={{ fontSize: '35px', fontWeight: '3em' }}>
        {avgRating}
        <StarRating />
      </span>
      <br />
      <br />
      <div style={{
        font: 'Gerogia', fontSize: '18px', fontWeight: 'bold', color: 'teal', float: 'left',
      }}
      >
        {percent}
        % of reviewers recommend this product
      </div>
      <></>
      <div
        className="rating-display"
        style={{
          float: 'center', margin: '2em', padding: '2em', width: '500px',
        }}
      >
        {starPercentArray.map((percentStar, idx) => (
          <fragment key={percentStar.id}>
            <strong>
              {idx === 0 ? `${idx + 1} star` : `${idx + 1} stars`}
            </strong>
            <ProgressBar bgcolor="green" width="300px" completed={percentStar} />
            <span style={{ fontWeight: '4em', margin: '2em' }}>{indiRatings[idx]}</span>
          </fragment>
        ))}
      </div>
    </div>
  );
}

export default Ratings;
