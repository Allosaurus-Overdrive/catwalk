import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import Description from './Description';

// **Styling Tempelates** //

const Layout = styled.div`
  height: 850px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

const Column1Row1 = styled.div`
  height: 700px;
  grid-column: 1;
  place-self: center;
  background-color: light gray;
  background-size: 100%;
`;

const Buttons = styled.div`
  grid-column: 2/3;
  grid-row: 1;
  align-self: end;
`;

const ProductInfoPos = styled.div`
  grid-column: 2/3;
  grid-row: 1;
  align-self: start;
`;

const Row2 = styled.div`
  grid-column: 1/3;
  grid-row: 2
`;

// **Functionality Section** //

const ProductOverview = () => (
  <Layout>
    <Column1Row1>
      <ImageGallery />
    </Column1Row1>
    <ProductInfoPos>
      <ProductInfo />
    </ProductInfoPos>
    <Buttons>
      <StyleSelector />
      <AddToCart />
    </Buttons>
    <Row2>
      <Description />
    </Row2>
  </Layout>
);

export default ProductOverview;
