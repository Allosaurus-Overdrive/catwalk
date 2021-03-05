import React, { useState, useEffect } from 'react';
import ProductOverview from './Product_Overview/ProductOverview';
import Reviews from './Reviews/reviews';
import { RelatedProducts } from './related/related';
import Outfits from './related/outfits';

const App = () => {
  const [productOverviewId, setProductOverviewId] = useState(20111);

  const productClickHandler = (clickedId) => {
    console.log(clickedId);
    setProductOverviewId(clickedId);
  };

  return (
    <div>
      <ProductOverview productOverviewId={productOverviewId} />
      <RelatedProducts
        productOverviewId={productOverviewId}
        productClickHandler={productClickHandler}
      />
      <Outfits productOverviewId={productOverviewId} />
      <Reviews />
    </div>
  );
};

export default App;
