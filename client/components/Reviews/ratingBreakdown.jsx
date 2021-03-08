/* eslint-disable no-restricted-syntax */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './progressBar';
import StarRating from './StarRating';

function Ratings({ productOverviewId }) {
  const [ratings, setRatings] = useState('');
  const [recommend, setRecommend] = useState('');
  const getMetaData = () => axios.get('/reviews/meta', { params: { id: productOverviewId } })
    .then(({ data }) => {
      setRatings(data.ratings);
      setRecommend(data.recommended);
    })
    .catch((err) => {
      console.log('metadata error', err);
    });

  useEffect(() => {
    getMetaData();
  }, [productOverviewId]);

  // calculating percent of recommendations
  // const trial = Number(mData.true);
  const yes = Number(recommend.true);
  const no = Number(recommend.false);
  const total = yes + no;
  const percent = Math.round((yes / total) * 100);

  // calculating average rating for product
  const scores = ratings;
  const sum = 1 * (Number(scores['1'])) + 2 * (Number(scores['2'])) + 3 * (Number(scores['3'])) + 4 * (Number(scores['4'])) + 5 * (Number(scores['5']));
  const weightedAvg = (sum / total);
  const avgRating = Number((weightedAvg).toFixed(1));

  const indiRatings = Object.values(scores);
  // calculate and create new array for average rating for each star display
  const starPercentArray = [];
  for (const score in scores) {
    const starValue = Number(scores[score]);
    const starPercent = Math.round((starValue / total) * 100);
    starPercentArray.push(starPercent);
  }

  return (
    <div>
      <span style={{ fontSize: '60px', fontWeight: '3em', display: 'inline-flex', flexDirection: 'row', justifyContent: 'space-around', position: 'relative', left: '40px' }}>
        {Number.isNaN(avgRating) ? null : avgRating}
        <br />
        <StarRating />
      </span>
      <br />
      <br />
      <div style={{
        font: 'Gerogia', fontSize: '24px', fontWeight: 'bold', position: 'relative', left: '40px',
      }}
      > {Number.isNaN(total) ? `Based on Reviews` :
        `Based on
        ${' '}
        ${total}
        ${' '}
        reviews`
    }
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
      <div style={{
        font: 'Gerogia', fontSize: '20px', fontWeight: 'bold', position: 'relative', left: '40px',
      }}
      >
        {Number.isNaN(percent) ? null
          : `${percent}
        % of reviewers recommend this product`}
      </div>
    </div>
  );
}

export default Ratings;
