import React from 'react';
import styled from 'styled-components';

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
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
  wiidth: 100%;
  grid-column: 1/3;
  grid-row: 2;
`;

const Column3Row2 = styled.div`
  width: 100%;
  grid-column: 3/4;
  grid-row: 2;
`;

const AddToCart = () => (
  <CartGrid>
    <Column1Row1>
      <select>
        <option value="size">Select Size</option>
      </select>
    </Column1Row1>
    <Column2Row1>
      <select>
        <option value="quantity">1</option>
      </select>
    </Column2Row1>
    <Column1Row2>
      <button type="submit">ADD TO BAG</button>
    </Column1Row2>
    <Column3Row2>
      <button type="submit">Heart, Star, Plus thingy</button>
    </Column3Row2>
  </CartGrid>
);

export default AddToCart;
