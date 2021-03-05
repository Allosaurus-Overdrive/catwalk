import React from 'react';
import ProductOverview from './Product_Overview/ProductOverview';
import Reviews from './Reviews/reviews';
import Related from './related/related';

const App = () => (
  <div>
    <ProductOverview />
    <Related.RelatedProducts />
    <Reviews />
  </div>
);

export default App;
