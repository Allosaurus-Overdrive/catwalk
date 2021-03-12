import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './reviewTile';
import Characteristics from './productBreakdown';
import Ratings from './ratingBreakdown';
// import SortReviews from './sortReviews';

const GridLayout = styled.div`
  font-family: 'Roboto', sans-serif;
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  overflow-x: hidden;
`;

const RatingsStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  grid-row: 1;
  grid-column: 1;
  position: relative;
  left: 100px;
  display: flex;
`;

const CharStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  grid-row: 2;
  grid-column: 1;
  position: relative;
  left: 60px;
  display: flex;
`;

const SortStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  position: relative;
  top: 25px;
  left: 400px;
  grid-row: 1;
  grid-column: 2;
`;
const ReviewStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  grid-row: 2 / 3;
  grid-column: 2 / 3 / 4;
`;

function Reviews({ productOverviewId, clickTracker }) {
  // const [showMore, setMore] = useState(false);
  const [reviewsData, setReviews] = useState([]);
  const [count, setCount] = useState('');
  const [sortId, setSortId] = useState('relevant');
  const [ratings, setRatings] = useState('');
  const [recommend, setRecommend] = useState('');
  const [characteristics, setCharacteristics] = useState('');

  const getData = () => axios.get('/reviews', { params: { id: productOverviewId, sort: sortId } })
    .then(({ data }) => {
      setReviews(data.results);
      setCount(data.results.length);
      setSortId(sortId);
    })
    .catch((err) => {
      console.log('metadata error', err);
    });

  useEffect(() => {
    getData();
  }, [productOverviewId, sortId]);

  const getMetaData = () => axios.get('/reviews/meta', { params: { id: productOverviewId } })
    .then(({ data }) => {
      setRatings(data.ratings);
      setRecommend(data.recommended);
      setCharacteristics(data.characteristics);
    })
    .catch((err) => {
      console.log('metadata error', err);
    });

  useEffect(() => {
    getMetaData();
  }, [productOverviewId]);
  return (
    // <h3>RATINGS and REVIEWS</h3>
    <GridLayout>
      <RatingsStyle>
        <Ratings
          productOverviewId={productOverviewId}
          ratings={ratings}
          recommend={recommend}
        />
      </RatingsStyle>
      <CharStyle>
        <Characteristics
          productOverviewId={productOverviewId}
          characteristics={characteristics}
        />
      </CharStyle>
      <SortStyle>
        <div onClick={() => clickTracker(`sort id: ${sortId}`, 'Ratings & Reviews')}>
          <label htmlFor="review-sort">
            <strong>
              {count}
              {' '}
              reviews, sorted by
              {' '}
            </strong>
          </label>
          <select id="review-sort" onChange={(e) => setSortId(e.target.value)}>
            <option value="relevant">relevant</option>
            <option value="helpful">helpful</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </SortStyle>
      <ReviewStyle>
        <ReviewTile
          productOverviewId={productOverviewId}
          reviewsData={reviewsData}
          getData={getData}
          count={count}
          clickTracker={clickTracker}
        />
      </ReviewStyle>
    </GridLayout>
  );
}

export default Reviews;
