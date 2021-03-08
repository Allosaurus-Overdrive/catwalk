import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// **Styling Templates** //

const DescriptionGrid = styled.div`
  display: grid;
  grid-tempelate-colums: 2fr 1fr;
  grid-template-rows: 1fr;
  margin-top: 50px;
`;

const Column1 = styled.div`
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

const Description = ({ productOverviewId }) => {
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [features, setFeatures] = useState([]);

  const getDescription = () => axios.get('/products', { params: { id: productOverviewId } })
    .then((response) => {
      setSlogan(response.data.slogan);
      setDescription(response.data.description);
      setFeatures(response.data.features);
    })
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getDescription();
  }, [productOverviewId]);

  return (
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
};

export default Description;
