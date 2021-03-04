import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

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
};

export default ModalContent;
