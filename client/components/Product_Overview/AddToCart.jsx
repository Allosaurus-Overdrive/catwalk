import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// **Styling Templates** //

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

const Column1Row1 = styled.div`
  width: 100%;
  grid-column: 1/2;
  grid-row: 1;
`;

const Column2Row1 = styled.div`
  width: 100%;
  grid-column: 2/4;
  grid-row: 1;
`;

const Column1Row2 = styled.div`
  width: 100%;
  grid-column: 1/3;
  grid-row: 2;
`;

const Column3Row2 = styled.div`
  width: 100%;
  grid-column: 3/4;
  grid-row: 2;
`;

const SelectStyle = styled.select`
  width: 100%;
  height: 50px;
  margin: 2px 2px 2px 2px;
  border: solid 1px;
  font-family: ‘Roboto’, sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 50px;
  border: solid: 1px;
  margin: 2px 2px 2px 2px;
  font-family: ‘Roboto’, sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

// **Functionality Section** //

const AddToCart = () => {
  const [amount, setAmount] = useState('0');
  const [results, setResults] = useState({});

  const getResults = () => axios.get('/products/20111/styles')
    .then(({ data }) => (
      setResults(data.results[0].skus)
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getResults();
  }, []);

  const handleChange = ((event) => {
    setAmount(event.target.value);
  });

  return (
    <CartGrid>
      <Column1Row1>
        <SelectStyle onChange={handleChange}>
          {Object.keys(results).map((size) => (
            <option key={size} value={results[size].quantity}>{results[size].size}</option>
          ))}
          {/* <option value="size">Select Size</option> */}
        </SelectStyle>
      </Column1Row1>
      <Column2Row1>
        <SelectStyle>
          <option value="quantity">{amount}</option>
        </SelectStyle>
      </Column2Row1>
      <Column1Row2>
        <ButtonStyle type="submit">ADD TO BAG</ButtonStyle>
      </Column1Row2>
      <Column3Row2>
        <ButtonStyle type="submit">Heart, Star, Plus thingy</ButtonStyle>
      </Column3Row2>
    </CartGrid>
  );
};

export default AddToCart;
