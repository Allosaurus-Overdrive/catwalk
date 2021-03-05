import React, { useState, useEffect } from 'react';
import axios from 'axios';

// **Styling Tempelates**//

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
      <div>{category}</div>
      <div>{name}</div>
      <div>
        $
        {price}
      </div>
    </div>
  );
};

export default ProductInfo;
