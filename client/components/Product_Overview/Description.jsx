import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// **Styling Templates** //

const DescriptionGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  margin-top: 25px;
`;

const Column1 = styled.div`
  max-width: 66%;
  overflow: hidden;
  grid-column: 1/2;
`;

const Column2 = styled.div`
  grid-column: 2/3;
`;

const SloganStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: bold;
`;

const DescriptionStyle = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

const FeatureStyle = styled.div`
  margin: 10px 5px 10px 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
`;

// **Functionality Section** //

const Description = ({ description, slogan, features }) => (
  <DescriptionGrid>
    <Column1>
      <SloganStyle>{slogan}</SloganStyle>
      <DescriptionStyle>{description}</DescriptionStyle>
    </Column1>
    <Column2>
      {features.map((feature) => (
        <FeatureStyle key={feature.feature}>
          &#10003;
          {`${feature.feature} ${feature.value}`}
        </FeatureStyle>
      ))}
    </Column2>
  </DescriptionGrid>
);

export default Description;
