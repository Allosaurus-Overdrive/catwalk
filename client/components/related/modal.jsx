import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';

//  //  //  //  //  //  //  //  //  //
// RELATED MODAL STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //

const ModalTitle = styled.h3`
  font-weight: 100;
  font-size: 70%;
  color: #747474;
  display: block;
  text-transform: uppercase;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
`;

const ModalHeaderTitle = styled.h3`
  display: block;
  color: #525252;
  font-weight: 800;
  font-size: 90%;
  float: ${(props) => (props.new ? 'right' : 'left')};
  margin: 0 1.5rem 1.5rem 1.5rem;
`;

const ModalTable = styled.table`
  float: left;
  table-layout: fixed;
  width: 27rem;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 80%;
  margin-left: 1.5rem;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

const ModalTableRow = styled.tr`
  margin-top: 5px;
`;

const ModalTableCell = styled.td`
  text-align: ${(props) => {
    if (props.left) {
      return 'left';
    }
    if (props.right) {
      return 'right';
    }
    return 'center';
  }};
  color: ${(props) => (props.center ? '#727272' : 'default')};
`;

const ModalTableBody = styled.tbody`
  width: 100%;
`;

const ModalTableCaption = styled.caption`
  position: absolute;
  bottom: 1.5rem;
  font-size: 50%;
  color: gray;
  text-align: center;
`;

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT MODAL FUNCTIONAL COMPONENT /
//  //  //  //  //  //  //  //  //  //  //  //

// make sure that the current product features are already set in state before rendering
// maybe having a loading tag if it ends up loading slowly

function ModalContent(props) {
  const [allFeatures, setAllFeatures] = useState(null);

  // trigger rerender upon currentproductfeatures updating
  const getFeaturesArray = () => {
    const current = props.currentFeatures;
    const clicked = props.clickedFeatures;

    const allFeaturesObj = {};

    for (let i = 0; i < current.length; i++) {
      if (allFeaturesObj[current[i].feature] === undefined) {
        allFeaturesObj[current[i].feature] = {current: null, clicked: null}
      }

      if (current[i].value === null) {
        allFeaturesObj[current[i].feature].current = true;
      } else {
        allFeaturesObj[current[i].feature].current = current[i].value.slice(1, -1);
      }
    }

    for (let j = 0; j < clicked.length; j++) {
      if (allFeaturesObj[clicked[j].feature] === undefined) {
        allFeaturesObj[clicked[j].feature] = {current: null, clicked: null}
      }

      if (clicked[j].value === null) {
        allFeaturesObj[clicked[j].feature].clicked = true;
      } else {
        allFeaturesObj[clicked[j].feature].clicked = clicked[j].value.slice(1, -1);
      }
    }

    const allFeaturesArray = [];

    Object.entries(allFeaturesObj).forEach((entry) => {
      allFeaturesArray.push([entry[1].current, entry[0], entry[1].clicked]);
    });

    setAllFeatures(allFeaturesArray);
  };

  useEffect(() => {
    getFeaturesArray();
  }, []);

  return (
    <div>
      <ModalTitle>Comparing</ModalTitle>
      <ModalHeaderTitle>{props.currentName}</ModalHeaderTitle>
      <ModalHeaderTitle new>{props.clickedName}</ModalHeaderTitle>
      {allFeatures !== null && (
      <ModalTable>
        {/* <thead>
          <tr>
            <th>{props.currentName}</th>
            <th>  </th>
            <th>{props.clickedName}</th>
          </tr>
        </thead> */}
        <ModalTableBody>
          {allFeatures.map((featureRow) => (
            <tr key={JSON.stringify(featureRow)}>
              {featureRow[0] === true
                ? <ModalTableCell left>&#x2713;</ModalTableCell>
                : <ModalTableCell left>{featureRow[0]}</ModalTableCell>}
              <ModalTableCell center>{featureRow[1]}</ModalTableCell>
              {featureRow[2] === true
                ? <ModalTableCell right>&#x2713;</ModalTableCell>
                : <ModalTableCell right>{featureRow[2]}</ModalTableCell>}
            </tr>
          ))}
        </ModalTableBody>
        <ModalTableCaption>Comparing the features of {props.currentName} and {props.clickedName}</ModalTableCaption>
      </ModalTable>
      )}
    </div>
  );
}

export default ModalContent;
