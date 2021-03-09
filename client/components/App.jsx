import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductOverview from './Product_Overview/ProductOverview';
import Questions from './questionsAndanswers/Questions';
import Reviews from './Reviews/reviews';
import { RelatedProducts } from './related/related';
import Outfits from './related/outfits';

const Divider = styled.div`
  width: 100%;
  height: 7rem;
`;

const App = () => {
  const [productOverviewId, setProductOverviewId] = useState(20111);

  const productClickHandler = (clickedId) => {
    console.log(clickedId);
    setProductOverviewId(clickedId);
  };

  return (
    <div>
      <ProductOverview productOverviewId={productOverviewId} />
      <Divider />
      <RelatedProducts
        productOverviewId={productOverviewId}
        productClickHandler={productClickHandler}
      />
      <Outfits productOverviewId={productOverviewId} />
      <Questions productOverviewId={productOverviewId} />
      <Reviews productOverviewId={productOverviewId} />
    </div>
  );
};

export default App;
