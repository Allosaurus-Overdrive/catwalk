import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import OutfitCard from './outfitcard';
import { productOverviewId,
  RelatedProducts,
  RelatedProductsWrapper,
  RelatedProductsTitle,
  RelatedProductsListWrapper,
  RelatedProductsList,
  RelatedArrowButton } from './related';
import { RelatedCardWrapper } from './relatedcard';

const OutfitCardWrapper = styled(RelatedCardWrapper)`
  margin: 16px 10px;
`;

const OutfitIconWrapper = styled.div`
  height: 67%;
  width: 100%;
  background-color: silver;
`;

const OutfitPlusIcon = styled.i`
  color: white;
  position: absolute;
  display: block;
  left: 43px;
  top: 45px;
  opacity: 1;
  &:hover{
    color: gold;
    cursor: pointer;
  }
`;

const OutfitAddText = styled.h3`
  display: block;
  font-size: 90%;
  font-weight: 400;
  margin-top: 2rem;
  text-transform: uppercase;
  color: gray;
  text-align: center;
`;

// the Add to Outfit static card should be rendered in the html statically, after the list from localstorage

const Outfits = (props) => {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [outfitsArray, setOutfitsArray] = useState([]);
  const [outfitsStylesObj, setOutfitsStylesObj] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);
  });

  // Get related product, all styles of related products, and current product features
  const getYourOutfits = () => {
    // have to pass in product ids of stored outfits
    // store an array out outfits to render... maybe in state?
    axios.get('/related-styles', { params: { id: productOverviewId } })
      .then(({data}) => {
        setOutfitsStylesObj(data);
      })
      .catch((err) => console.log(err));


  };

  const storeOutfit = ()  => {
    // store the product id of the current page you're on

  };

  // useEffect(() => {
  //   getYourOutfits();
  // }, []);

  const onAddCardClickHandler = () => {
    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => {
        const newOutfitsArray = outfitsArray;
        let duplicate = false;

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
            const newOutfitsStylesObj = outfitsStylesObj || {};
            newOutfitsStylesObj[data.product_id] = data.results;

            setOutfitsStylesObj(newOutfitsStylesObj);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const scroll = (scrollOffset) => {
    let currentScrollLeft;

    if (ref.current.scrollLeft + scrollOffset + clientWidth >= scrollWidth && scrollOffset > 0) {
      currentScrollLeft = scrollWidth;
    } else if (ref.current.scrollLeft + scrollOffset <= 0 && scrollOffset < 0) {
      currentScrollLeft = 0;
    } else if (ref.current.scrollLeft === 0 && scrollOffset > 0) {
      if (scrollOffset + clientWidth > scrollWidth) {
        currentScrollLeft = scrollWidth;
      } else {
        currentScrollLeft = scrollOffset + clientWidth;
      }
    } else {
      currentScrollLeft = ref.current.scrollLeft + scrollOffset;
    }

    ref.current.scrollLeft += scrollOffset;
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);

    const atLeftEnd = (scrollOffset < 0 && currentScrollLeft === 0);
    const atRightEnd = (currentScrollLeft === (outfitsArray.length + 1) * 222) && (scrollOffset > 0);

    if (atLeftEnd) {
      setEndReached('left');
    } else if (atRightEnd) {
      setEndReached('right');
    } else if (clientWidth >= scrollWidth) {
      setEndReached('both');
    } else {
      setEndReached('middle');
    }

    return scrollOffset;
  };

  return (
    <RelatedProductsWrapper>
      <RelatedProductsTitle>YOUR OUTFITS</RelatedProductsTitle>
      {endReached !== 'left' && endReached !== 'both'
      && <RelatedArrowButton left className="left" type="button" onClick={() => scroll(-287)}> &#8592; </RelatedArrowButton>}
      <RelatedProductsListWrapper ref={ref}>
        {outfitsArray !== null
        && outfitsStylesObj !== null
        && currentProductData !== null
        && (
          <RelatedProductsList>
            {outfitsArray.map((item) => (
              <OutfitCard
                item={item}
                key={item.id}
                styles={outfitsStylesObj[item.id]}
                currentFeatures={currentProductData.features}
                currentName={currentProductData.name}
              />
            ))}
          </RelatedProductsList>
        )}
        <OutfitCardWrapper onClick={onAddCardClickHandler}>
          <OutfitIconWrapper>
            <OutfitPlusIcon className="fas fa-plus-circle fa-7x" />
          </OutfitIconWrapper>
          <OutfitAddText>Add To Your Outfits</OutfitAddText>
        </OutfitCardWrapper>
      </RelatedProductsListWrapper>
      {endReached !== 'right' && endReached !== 'both'
      && <RelatedArrowButton className="right" type="button" onClick={() => scroll(287)}> &#8594; </RelatedArrowButton>}
    </RelatedProductsWrapper>
  );
};

export default Outfits;
