import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
    // console.log(clickedId);
    setProductOverviewId(clickedId);
  };

  const clickTracker = (element, module) => {
    axios.post('/clicktracker', { element: element, modulecomponent: module })
      .catch((err) => console.log('error in storing click data: ', err));
  };

  return (
    <div>
      <ProductOverview
        productOverviewId={productOverviewId}
        clickTracker={clickTracker}
      />
      <Divider />
      <RelatedProducts
        productOverviewId={productOverviewId}
        productClickHandler={productClickHandler}
        clickTracker={clickTracker}
      />
      <Outfits
        productOverviewId={productOverviewId}
        clickTracker={clickTracker}
      />
      <Questions productOverviewId={productOverviewId} />
      <Reviews productOverviewId={productOverviewId} clickTracker={clickTracker} />
    </div>
  );
};

export default App;
