import React from 'react';
import ProductOverview from './Product_Overview/ProductOverview';
import Reviews from './Reviews/reviews';
import { RelatedProducts } from './related/related';
import Outfits from './related/outfits';

const App = () => (
  <div>
    <ProductOverview />
    <RelatedProducts />
    <Outfits />
    <Reviews />
  </div>
);

export default App;
