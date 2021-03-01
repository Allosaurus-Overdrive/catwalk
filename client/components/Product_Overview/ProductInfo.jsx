import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../server/config';

const options = {
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const ProductInfo = () => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [slogan, setSlogan] = useState('');
  const [features, setFeatures] = useState([]);
  const getInfo = () => axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111', options)
    .then((response) => {
      setName(response.data.name);
      setCategory(response.data.category);
      setPrice(response.data.default_price);
      setSlogan(response.data.slogan);
      setDescription(response.data.description);
      setFeatures(response.data.features);
    })
    .catch((err) => {
      throw err;
    });

  getInfo();

  return (
    <div>
      <div>{name}</div>
      <div>{category}</div>
      <div>{price}</div>
      <div>{description}</div>
      <div>{slogan}</div>
      {features.map((feature, idx) => (
        <div key={feature.feature}>
          {feature.feature}
          {feature.value}
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;
