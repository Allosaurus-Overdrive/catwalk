import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';

// **Styling Templates** //

const ImagePos = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr;
`;

const Arrow1 = styled.div`
  grid-column: 1;
  place-self: center;
`;

const ImageStyle = styled.div`
  grid-column: 2;
  place-self: center;
`;

const Arrow2 = styled.div`
  grid-column: 3;
  place-self: center;
`;

// **Functionality Section** //

const ImageGallery = ({ productOverviewId }) => {
  const [image, setImage] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const getImages = () => axios.get('/styles', { params: { id: productOverviewId } })
    .then((response) => (
      response.data.results.map((style) => (
        setImage(image => [...image, style.photos[0].url])
      ))
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getImages();
  }, [productOverviewId]);

  // **Arrow for Carousel**//
  const ArrowLeft = ({ direction, clickFunction, glyph }) => (
    <div
      className={`slide-arrow${direction}`}
      onClick={clickFunction}
      onKeyPress={clickFunction}
      role="button"
      tabIndex="0"
    >
      {glyph}
    </div>
  );

  const ArrowRight = ({ direction, clickFunction, glyph }) => (
    <div
      className={`slide-arrow${direction}`}
      onClick={clickFunction}
      onKeyPress={clickFunction}
      role="button"
      tabIndex="0"
    >
      {glyph}
    </div>
  );

  // **Arrow functionality**//
  const previousSlide = () => {
    setCurrentImage(currentImage - 1);
  };

  const nextSlide = () => {
    setCurrentImage(currentImage + 1);
  };

  return (
    <ImagePos className="carousel">
      {currentImage !== 0
      && (
        <Arrow1>
          <ArrowLeft
            direction="left"
            clickFunction={previousSlide}
            glyph="&#9664;"
          />
        </Arrow1>
      )}
      <ImageStyle>
        <ImageSlide url={image[currentImage]} />
      </ImageStyle>
      {currentImage !== image.length - 1
      && (
        <Arrow2>
          <ArrowRight
            direction="right"
            clickFunction={nextSlide}
            glyph="&#9654;"
          />
        </Arrow2>
      )}
    </ImagePos>
  );
};

export default ImageGallery;
