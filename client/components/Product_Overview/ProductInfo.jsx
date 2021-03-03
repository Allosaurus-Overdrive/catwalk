import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../server/config';

const options = {
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const ProductInfo = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();

  const getInfo = () => axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111', options)
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
  });

  return (
    <div>
      <div>{category}</div>
      <div>{name}</div>
      <div>{price}</div>
    </div>
  );
};

export default ProductInfo;
