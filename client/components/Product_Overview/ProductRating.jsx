import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import styled from 'styled-components';

const RatingSpan = styled.span`
  s
`;

const RatingStar = styled.div`
  margin: 10px 10px 10px 10px
`;

function StarRating({ avgRating }) {
  return (
    <RatingStar>
      {[...Array(5)].map((star, i) => (
        <label key={i}>
          <FaStar size={25} color={avgRating > (i + 0.5) ? '#ffc107' : 'lightgrey'} />
        </label>
      ))}
    </RatingStar>
  );
}

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

  // calculating average rating for product
  const scores = ratings;
  const sum = 1 * (Number(scores['1'])) + 2 * (Number(scores['2'])) + 3 * (Number(scores['3'])) + 4 * (Number(scores['4'])) + 5 * (Number(scores['5']));
  const weightedAvg = (sum / total);
  const avgRating = Number((weightedAvg).toFixed(1));

  // calculate and create new array for average rating for each star display
  const starPercentArray = [];
  for (const score in scores) {
    const starValue = Number(scores[score]);
    const starPercent = Math.round((starValue / total) * 100);
    starPercentArray.push(starPercent);
  }

  return (
    <RatingSpan>
      <StarRating avgRating={avgRating} />
    </RatingSpan>
  );
}

export default Ratings;
