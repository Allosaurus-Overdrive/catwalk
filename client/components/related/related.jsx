import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import { ProductCard } from './relatedcard';

//  //  //  //  //  //  //  //  //  //  //  //
// RELATED PRODUCT LIST STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //  ////

const RelatedProductsWrapper = styled.section`
  margin-left: 14.3%;
  margin-right: 14.3%;
  height: 366px;
  position: relative;
`;

const RelatedProductsTitle = styled.h3`
  color: grey;
  font-weight: 100;
  font-size: 90%;
  font-family: 'Roboto', sans-serif;
  margin-left: 1.5rem;
  margin-block-end: 0;
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const RelatedProductsListWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 350px;
  width: 98%;
  margin-left: 10px;
  margin-right: 10px;
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;
`;

const RelatedProductsList = styled.ul`
  display: inline;
  padding-inline-start: 0;
  position: relative;
`;

const RelatedArrowButton = styled.button`
  position: absolute;
  font-size: 150%;
  ${(props) => (props.left ? 'left: -50px' : '')};
  ${(props) => (props.right ? 'right: -20px' : '')};
  margin: auto;
  padding: 0;
  border-style: none;
  height: 290px;
  width: 50px;
  margin-left: 1.5rem;
  margin-top: 0.9em;
  margin-block-end: 1em;
  cursor: pointer;
  background: linear-gradient(to ${(props) => (props.left ? 'right' : 'left')},  rgba(255, 255, 255, 1) 0%, rgba(233, 233, 233, 0) 100%);
  z-index: 1;
  &:focus{
    outline: none
  };
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT LIST FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //  //  //

function RelatedProducts({ productOverviewId, productClickHandler, clickTracker }) {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [currentProductId, setCurrentProductId] = useState(productOverviewId);
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
  }, [productOverviewId]);

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
      <RelatedProductsTitle>RELATED PRODUCTS</RelatedProductsTitle>
      <ButtonWrapper>
        {endReached !== 'left' && endReached !== 'both'
        && <RelatedArrowButton left className="left" type="button" onClick={() => scroll(-287)}>‹</RelatedArrowButton>}
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
                    productClickHandler={productClickHandler}
                    clickTracker={clickTracker}
                  />
                ))}
              </RelatedProductsList>
            </ModalProvider>
          )}
        </RelatedProductsListWrapper>
        {endReached !== 'right' && endReached !== 'both'
        && <RelatedArrowButton right className="right" type="button" onClick={() => scroll(287)}>›</RelatedArrowButton>}
      </ButtonWrapper>
    </RelatedProductsWrapper>
  );
}

// DELETE THIS
function testFunc(a, b) {
  return a - b;
}

export {
  RelatedProducts,
  RelatedProductsWrapper,
  RelatedProductsTitle,
  RelatedProductsListWrapper,
  RelatedProductsList,
  RelatedArrowButton,
  testFunc,
};
