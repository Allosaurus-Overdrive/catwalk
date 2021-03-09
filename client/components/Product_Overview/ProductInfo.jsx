import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// **Styling Tempelates**//
const CategoryStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  margin: 7.5px 10px 7.5px 10px;
`;

const NameStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 36px;
  font-weight: bold;
  margin: 7.5px 10px 7.5px 10px;
`;

const PriceStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  margin: 7.5px 10px 7.5px 10px;
`;

// **Functionality Section** //

const ProductInfo = ({ name, category, price }) => (
  <div>
    <CategoryStyle>{category}</CategoryStyle>
    <NameStyle>{name}</NameStyle>
    <PriceStyle>
      $
      {price}
    </PriceStyle>
  </div>
);

export default ProductInfo;
