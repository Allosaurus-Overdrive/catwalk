import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DescriptionGrid = styled.div`
  display: grid;
  grid-tempelate-colums: 2fr 1fr;
  grid-template-rows: 1fr;
`;

const Column1 = styled.div`
  grid-column: 1/2;
`;

const Column2 = styled.div`
  grid-column: 2/3;
`;

const Description = () => {
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [features, setFeatures] = useState([]);

  const getDescription = () => axios.get('/products/20111')
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
  });

  return (
    <DescriptionGrid>
      <Column1>
        <div>{slogan}</div>
        <div>{description}</div>
      </Column1>
      <Column2>
        {features.map((feature) => (
          <div key={feature.feature}>
            {feature.feature}
            {feature.value}
          </div>
        ))}
      </Column2>
    </DescriptionGrid>
  );
};

export default Description;
