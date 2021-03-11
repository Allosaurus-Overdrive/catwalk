import React from 'react';
import styled from 'styled-components';

const Picture = styled.img`
  width: 100%;
  height: auto;
  grid-column: 1;
  place-self: center;
  background-color: light grey;
  `;

const ImageSlide = ({ url }) => (
  <Picture className="image-slide" src={url} alt="" />
);

export default ImageSlide;
