import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import ProductCard from './relatedcard';

// TO-DOS:
// get the productID of the current page from alex's overview component where he stores the id?
// import the ratings star function from sheeba

// need to get this somehow from alex's component.
// or if he sets 20111 as his default, then we can just always start with this;
// set this in the state of the product carousel functional component. refactor if needed
let productOverviewId = 20111;

//  //  //  //  //  //  //  //  //  //
// RELATED MODAL STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //

const ModalTitle = styled.h3`
  font-weight: 100;
  font-size: 80%;
  color: grey;
  display: block;
  text-transform: uppercase;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
`;

const ModalHeaderTitle = styled.h3`
  display: inline-block;
  font-weight: 400;
  font-size: 100%;
  float: ${(props) => (props.new ? 'right' : 'left')};
  margin-left: 1.5rem;
  margin-right: 1.5rem;
`;

const ModalTable = styled.table`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 80%;
  display: inline-block;
  border-style: solid;
`;

const ModalTableRow = styled.tr`
  color: gray;
`;

//  //  //  //  //  //  //  //  //  //  //  //
// RELATED PRODUCT LIST STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //  ////

const RelatedProductsWrapper = styled.section`
  margin-left: 10px;
  margin-right: 10px;
`;

const RelatedProductsListWrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 350px;
  width: 85%;
  margin-left: 10px;
  margin-right: 10px;
  background: white;
  position: relative;
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
  font-size: 150%;
  float: ${(props) => (props.left ? 'left' : 'right')};
  margin: auto;
  padding: 0;
  border-style: none;
  height: 287px;
  width: 50px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  cursor: pointer;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT MODAL FUNCTIONAL COMPONENT /
//  //  //  //  //  //  //  //  //  //  //  //

// make sure that the current product features are already set in state before rendering
// maybe having a loading tag if it ends up loading slowly

// get the current product (and store its features in state)
//   need an axios request on client and then on backend
// pass the product features of the clicked modal down from where ModalContent is mounted in the card component (props.item.features)
//   this is synchronous so I'll get this clicked product info before the current product info
// the features come as an array of objects
//   each obj has the feature name and the value (a value or null)
//   if null, display checkmark
//   if value, display value
// iterate over the array and for each obj, return:
//   first add the obj.feature to a set (initialize empty set before this)
//   new table row
//   first cell is html checkmark symbol if obj.value === null, print the value if it's !== null
//   second cell is just obj.feature
//   third cell....
//     initialize the cell as empty
//     iterate through array of features for the clicked product
//     if obj.feature !== undefined in any of the objs in the array, return checkmark or value for the 3rd cell

// another method:
// async function to get the current product features and load into state
// await for the response
// await for the response to load into state
// iterate over both features arrays and load each featureobj.feature into a set object
// to create a thruple:
//   iterate over the set objectt with a forEach
//   check in each feature array to see if it exists and load the value (the time complexity is immense)

// have an allfeatures array of {featurename: {current: value, clicked: value}, featurename: {}, etc}
// this prevents duplicates cuz the featurename is the key
// iterate over the current product features, for each item in the array, allfeatures[obj.feature].current = obj.value (and convert null to true)
// iterate over the clicked product features, do the same as above. allfeatures[obj.feature].clicked = obj.value
// iterate over the obj, turn it into an array
//   for key in allfeaturesobj, push [key, key.current, key.clicked] into a new array
//   now can map over this array for rendering

function ModalContent(props) {
  const [currentFeatures, setCurrentFeatures] = useState(props.currentFeatures);
  const [clickedFeatures, setClickedFeatures] = useState(props.clickedFeatures);

  // trigger rerender upon currentproductfeatures updating
  return (
    <div>
      <ModalTitle>Comparing</ModalTitle>
      <ModalHeaderTitle>Current Product Name</ModalHeaderTitle>
      <ModalHeaderTitle new>New Product Name</ModalHeaderTitle>
      <p>{currentFeatures[0].feature}</p>
      <p>{clickedFeatures[0].feature}</p>
      {/* <ModalTable>

      </ModalTable> */}
    </div>
  );
}

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT LIST FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //  //  //

function RelatedProducts(props) {
  const ref = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [endReached, setEndReached] = useState('left');
  const [relatedProductsArray, setRelatedProductsArray] = useState(null);
  const [relatedProductsStylesObj, setRelatedProductStylesObj] = useState(null);
  const [currentProductFeatures, setCurrentProductFeatures] = useState(null);

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
        setCurrentProductFeatures(data);
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
      {endReached !== 'left' && endReached !== 'both'
      && <RelatedArrowButton left className="left" type="button" onClick={() => scroll(-287)}> &#8592; </RelatedArrowButton>}
      <RelatedProductsListWrapper ref={ref}>
        {relatedProductsArray !== null
        && relatedProductsStylesObj !== null
        && currentProductFeatures !== null
        && (
          <ModalProvider backgroundComponent={FadingBackground}>
            <RelatedProductsList>
              {relatedProductsArray.map((item) => (
                <ProductCard
                  item={item}
                  key={item.id}
                  styles={relatedProductsStylesObj[item.id]}
                  currentFeatures={currentProductFeatures}
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

// DELETE THIS
function testFunc(a, b) {
  return a - b;
}
// export whole list of related products at the end, update the export
export default {
  productOverviewId,
  RelatedProducts,
  testFunc,
};
