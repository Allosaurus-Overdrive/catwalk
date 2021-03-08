import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ReviewTile from './reviewTile';
import Characteristics from './productBreakdown';
import Ratings from './ratingBreakdown';
import metaData from './sampleRatingsData';

const yes = Number(metaData.recommended.true);
const no = Number(metaData.recommended.false);
const totalNumber = yes + no;

const GridLayout = styled.div`
  padding: 3em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
`;

const RatingsStyle = styled.div`
  grid-row: 1;
  grid-column: 1;
  position: relative;
  left: 50px;
`;

const CharStyle = styled.div`
  grid-row: 2;
  grid-column: 1;
  position: relative;
  left: 40px;
`;

const SortStyle = styled.div`
  font-size: 20px;
  position: relative;
  top: 25px;
  left: 400px;
  grid-row: 1;
  grid-column: 2;
`;
const ReviewStyle = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3 / 4;
`;

function Reviews({ productOverviewId }) {
  // const [reviewsData, setReviews] = useState([]);
  // const [metaData, setmetaData] = useState([]);
  // const [sortId, setSortId] = useState('relevant');
  // const [count, setCount] = useState('');
  // const getReviews = (productOverviewId, sortOption) => {
  //   axios.get(`/reviews/${id}&sort=${sortOption}`)
  //     .then((res) => (setProductReviewArray(res.data)))
  //     .catch((err) => console.log('get reviews ', err));

  // const updateData = () => {
  //   axios.get('/reviews', { params: { id: productOverviewId, sortId } })
  //     .then(({ data }) => {
  //       setReviews(data.results);
  //       // setCount(data.count);
  //     })
  //     .catch((err) => {
  //       console.log('data error', err);
  //     });
  // };

  // useEffect(() => {
  //   updateData();
  // }, [productOverviewId]);

  // useEffect(() => {
  //   updateData();
  // }, [sortId]);

  // const sortByType = (type) => {
  //   setSortId(type);
  // };

  return (
    //  <h3>RATINGS and REVIEWS</h3>
    <GridLayout>
      <RatingsStyle><Ratings productOverviewId={productOverviewId} /></RatingsStyle>
      <CharStyle><Characteristics productOverviewId={productOverviewId} /></CharStyle>
      <SortStyle>
        <div>
          <label htmlFor="review-sort">
            <strong>
              {totalNumber}
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
      </SortStyle>
      <ReviewStyle><ReviewTile productOverviewId={productOverviewId} /></ReviewStyle>
    </GridLayout>
  );
}

export default Reviews;
