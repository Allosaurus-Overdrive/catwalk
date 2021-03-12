import React from 'react';
import styled from 'styled-components';
// import StarRating from '../Reviews/StarRating';
import Ratings from './ProductRating';

// **Styling Tempelates**//
const CategoryStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin: 7.5px 10px 7.5px 10px;
`;

const NameStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: bold;
  margin: 7.5px 10px 7.5px 10px;
`;

const PriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  color: black;
  text-decoration: none;
  font-size: 16px;
  margin: 7.5px 10px 7.5px 10px;
`;

const LinedPriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  color: black;
  text-decoration: line-through;
  font-size: 16px;
  margin: 7.5px 10px 7.5px 10px;
`;

const SalePriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  color: red;
  margin: 7.5px 10px 7.5px 10px;
`;

// ** Star rating props ** //
// const yes = Number(recommend.true);
//   const no = Number(recommend.false);
//   const total = yes + no;
//   const percent = Math.round((yes / total) * 100);
//   // const [filter, setFilter] = useState('All');
//   // calculating average rating for product
//   const scores = ratings;
//   const sum = 1 * (Number(scores['1'])) + 2 * (Number(scores['2'])) + 3 * (Number(scores['3'])) + 4 * (Number(scores['4'])) + 5 * (Number(scores['5']));
//   const weightedAvg = (sum / total);
//   const avgRating = Number((weightedAvg).toFixed(1));

// **Functionality Section** //

const ProductInfo = ({
  name, category, price, salesPrice, productOverviewId
}) => (
  <div>
    <Ratings productOverviewId={productOverviewId} />
    <CategoryStyle>{category}</CategoryStyle>
    <NameStyle>{name}</NameStyle>
    {!salesPrice
    && (
      <PriceStyle>
        $
        {price}
      </PriceStyle>
    )}
    {salesPrice
    && (
    <div>
      <SalePriceStyle>
        $
        {salesPrice}
        <LinedPriceStyle>
          $
          {price}
        </LinedPriceStyle>
      </SalePriceStyle>
    </div>
    )}
  </div>
);

export default ProductInfo;
