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

const ProductInfo = ({ productOverviewId }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();

  const getInfo = () => axios.get('/products', { params: { id: productOverviewId } })
    .then((response) => {
      setName(response.data.name);
      setCategory(response.data.category);
      setPrice(response.data.default_price);
    })
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getInfo();
  }, [productOverviewId]);

  return (
    <div>
      <CategoryStyle>{category}</CategoryStyle>
      <NameStyle>{name}</NameStyle>
      <PriceStyle>
        $
        {price}
      </PriceStyle>
    </div>
  );
};

export default ProductInfo;
