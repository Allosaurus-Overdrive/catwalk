import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import ProductCard from './relatedcard';
import { productOverviewId,
  RelatedProducts,
  RelatedProductsWrapper,
  RelatedProductsTitle,
  RelatedProductsListWrapper,
  RelatedProductsList,
  RelatedArrowButton } from './related';

// the Add to Outfit static card should be rendered in the html statically, after the list from localstorage

const Outfits = (props) => {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [relatedProductsArray, setRelatedProductsArray] = useState(null);
  const [relatedProductsStylesObj, setRelatedProductStylesObj] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);

  useEffect(() => {
    setScrollLeft(ref.current.scrollLeft);
    setScrollWidth(ref.current.scrollWidth);
    setClientWidth(ref.current.clientWidth);
  });

  // Get related product, all styles of related products, and current product features
  const getRelatedProducts = () => {
    axios.get('/related-products', { params: { id: productOverviewId } })
      .then(({data}) => {
        setRelatedProductsArray(data);
      })
      .catch((err) => console.log(err));

    axios.get('/related-styles', { params: { id: productOverviewId } })
      .then(({data}) => {
        setRelatedProductStylesObj(data);
      })
      .catch((err) => console.log(err));

    axios.get('/product-features', { params: { id: productOverviewId } })
      .then(({ data }) => {
        setCurrentProductData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRelatedProducts();
  }, []);

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
    const atRightEnd = (currentScrollLeft === relatedProductsArray.length * 222) && (scrollOffset > 0);

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
        {relatedProductsArray !== null
        && relatedProductsStylesObj !== null
        && currentProductData !== null
        && (
          <ModalProvider backgroundComponent={FadingBackground}>
            <RelatedProductsList>
              {relatedProductsArray.map((item) => (
                <ProductCard
                  item={item}
                  key={item.id}
                  styles={relatedProductsStylesObj[item.id]}
                  currentFeatures={currentProductData.features}
                  currentName={currentProductData.name}
                />
              ))}
            </RelatedProductsList>
          </ModalProvider>
        )}
      </RelatedProductsListWrapper>
      {endReached !== 'right' && endReached !== 'both'
      && <RelatedArrowButton className="right" type="button" onClick={() => scroll(287)}> &#8594; </RelatedArrowButton>}
    </RelatedProductsWrapper>
  );
}

export default Outfits;
