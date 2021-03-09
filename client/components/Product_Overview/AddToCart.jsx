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
  margin: 10px 10px 10px 10px;
  border: solid 1px;
  font-family: ‘Roboto’, sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const ButtonStyle = styled.button`
  width: 100%;
  height: 50px;
  border: solid: 1px;
  margin: 10px 10px 10px 10px;
  font-family: ‘Roboto’, sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

// **Functionality Section** //

const AddToCart = ({ results, productOverviewId }) => {
  // **states and variables** //
  const [amount, setAmount] = useState('0');
  const [sku, setSku] = useState();
  const [number, setNumber] = useState(null);
  const [outfitsArray, setOutfitsArray] = useState([]);
  const [outfitsStylesObj, setOutfitsStylesObj] = useState({});
  const [currentProductData, setCurrentProductData] = useState(null);
  const quantityOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const quantityVals = quantityOptions.slice(0, amount);

  // **methods** //
  const handleSizeChange = ((event) => {
    setAmount(event.target.value.slice(7, 9));
    setSku(event.target.value.slice(0, 6));
  });

  const handleQuantityChange = ((event) => {
    setNumber(event.target.value);
  })

  // **Outfits Button Functionality **//
  const getYourOutfits = () => {
    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => { setCurrentProductData(data); })
      .catch((err) => console.log(err));

    const storedOutfits = JSON.parse(localStorage.getItem('outfits'));
    const storedStyles = JSON.parse(localStorage.getItem('styles'));
    if (storedOutfits) {
      setOutfitsArray(storedOutfits);
      setOutfitsStylesObj(storedStyles);
    }
  };

  useEffect(() => {
    getYourOutfits();
  }, []);

  const onAddCardClickHandler = () => {
    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => {
        const newOutfitsArray = outfitsArray;
        const newOutfitsStylesObj = outfitsStylesObj || {};
        let duplicate = false;

        setCurrentProductData(data);

        newOutfitsArray.forEach((outfit) => {
          if (outfit.id === data.id) {
            duplicate = true;
          }
        });

        if (!duplicate) {
          newOutfitsArray.push(data);
          setOutfitsArray(newOutfitsArray);
          setCurrentProductData(data);
        } else {
          alert('This item is already saved in your outfits!');
        }

        axios.get('/outfit-styles', { params: { id: productOverviewId } })
          .then(({ data }) => {
            newOutfitsStylesObj[data.product_id] = data.results;
            setOutfitsStylesObj(newOutfitsStylesObj);

            return {
              outfitInfo: newOutfitsArray,
              outfitStyles: newOutfitsStylesObj,
            };
          })
          .then(({ outfitInfo, outfitStyles }) => {
            localStorage.setItem('outfits', JSON.stringify(outfitInfo));
            localStorage.setItem('styles', JSON.stringify(outfitStyles));
            getYourOutfits();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <CartGrid>
      <Column1Row1>
        <SelectStyle onChange={handleSizeChange}>
          <option>Select Size</option>
          {Object.keys(results).map((size) => (
            results[size].quantity !== 0
            && (
              <option
                key={size}
                value={[size, results[size].quantity]}
                name={size}
              >
                {results[size].size}
              </option>
            )
          ))}
        </SelectStyle>
      </Column1Row1>
      <Column2Row1>
        <SelectStyle onChange={handleQuantityChange}>
          <option>-</option>
          {quantityVals.map((quantity) => (
            <option value={quantity}>{quantity}</option>
          ))}
        </SelectStyle>
      </Column2Row1>
      <Column1Row2>
        <ButtonStyle type="submit" onClick={onAddCardClickHandler}>ADD TO BAG</ButtonStyle>
      </Column1Row2>
      <Column3Row2>
        <ButtonStyle type="submit" onClick={onAddCardClickHandler}>Outfit Adder</ButtonStyle>
      </Column3Row2>
    </CartGrid>
  );
};

export default AddToCart;
