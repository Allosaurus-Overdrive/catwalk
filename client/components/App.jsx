import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
<<<<<<< HEAD
    // console.log(clickedId);
||||||| constructed merge base
    console.log(clickedId);
=======
>>>>>>> added click tracker component to App.jsx and listeners to related products and outfits components
    setProductOverviewId(clickedId);
  };

  const clickTracker = (element, module) => {
    axios.post('/clicktracker', { element: element, modulecomponent: module })
      .catch((err) => console.log('error in storing click data: ', err));
  };

  return (
    <div>
      <ProductOverview productOverviewId={productOverviewId} />
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
      <Reviews productOverviewId={productOverviewId} />
    </div>
  );
};

export default App;
