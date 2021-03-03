import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Picture = styled.img`
  width: 450px;
  grid-column: 1;
  `;

const ImageGallery = () => {
  const [image, setImage] = useState('');

  const getImages = () => axios.get('/products/20111/styles')
    .then((response) => (
      setImage(response.data.results[0].photos[0].url)
    ))
    .catch((err) => {
      throw err;
    });

  getImages();

  return (
    <Picture src={image} alt="" />
  );
};

export default ImageGallery;
