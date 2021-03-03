import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import Description from './Description';

const Layout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

const Column1Row1 = styled.div`
  grid-column: 1;
`;

const Column2Row1 = styled.div`
  grid-column: 2/3;
  grid-row: 1;
`;

const Row2 = styled.div`
  grid-column: 1/3;
  grid-row: 2
`;

const ProductOverview = () => (
  <Layout>
    <Column1Row1>
      <ImageGallery />
    </Column1Row1>
    <Column2Row1>
      <ProductInfo />
      <StyleSelector />
      <AddToCart />
    </Column2Row1>
    <Row2>
      <Description />
    </Row2>
  </Layout>
);

export default ProductOverview;
