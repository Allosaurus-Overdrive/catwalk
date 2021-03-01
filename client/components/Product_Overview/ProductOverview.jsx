import React from 'react';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';

const ProductOverview = () => (
  <div>
    <ImageGallery />
    <ProductInfo />
    <StyleSelector />
    <AddToCart />
  </div>
);

export default ProductOverview;
