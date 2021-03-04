<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductOverview from './Product_Overview/ProductOverview';
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
      <Reviews productOverviewId={productOverviewId} />
    </div>
  );
};
=======
import React from 'react';
import Questions from './questionsAndanswers/Questions';

const App = () => (
  <div>
    <Questions />
  </div>
);
>>>>>>> e5916ed (created basic html layout, fetched data from api is being displayed, photos have been conditionally added to answers)

export default App;
