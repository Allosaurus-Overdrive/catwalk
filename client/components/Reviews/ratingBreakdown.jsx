/* eslint-disable no-restricted-syntax */
import React from 'react';
import styled from 'styled-components';
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
  // const styleRating = styled.div`
  //   display: grid;
  // `;
  // const numStyle = styled.div`
  //   grid-column: 1;
  // `;
  // const displayStyle = styled.div`
  //   grid-column: 2;
  // `;
  return (
    <div>
      <span style={{ fontSize: '60px', fontWeight: '3em', display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-around', position: 'relative', left: '50px' }}>
        {avgRating}
        <br />
        <StarRating />
      </span>
      <br />
      <br />
      <div style={{
        font: 'Gerogia', fontSize: '20px', fontWeight: 'bold', position: 'relative', left: '50px',
      }}
      >
        {percent}
        % of reviewers recommend this product
      </div>
      <></>
      <div
        className="rating-display"
        style={{
          float: 'center', margin: '1em', padding: '1em', width: '400px', display: 'inline-flex', flexDirection: 'column-reverse', justifyContent: 'space-between',
        }}
      >
        {starPercentArray.map((percentStar, idx) => (
          <span key={percentStar.id}>
            <strong style={{ position: 'relative', right: '50px', top: '17px' }}>
              {idx === 0 ? `${idx + 1} star` : `${idx + 1} stars`}
            </strong>
            <ProgressBar bgcolor="green" completed={percentStar} />
            <span style={{ fontWeight: '4em', position: 'relative', left: '370px', bottom: '16px' }}>{indiRatings[idx]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ratings;
