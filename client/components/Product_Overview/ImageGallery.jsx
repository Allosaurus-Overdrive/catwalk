import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
import ImageSlide from './ImageSlide';

// **Styling Templates** //

// **Functionality Section** //

const ImageGallery = () => {
  const [image, setImage] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const getImages = () => axios.get('/products/20111/styles')
    .then((response) => (
      response.data.results.map((style) => (
        console.log(style),
        setImage(image => [...image, style.photos[0].url])
      ))
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getImages();
  }, []);

  // **Arrow for Carousel**//
  const ArrowLeft = ({ direction, clickFunction, glyph, isEdge }) => (
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
    <div className="carousel">
      {currentImage !== 0
      && (
        <ArrowLeft
          direction="left"
          clickFunction={previousSlide}
          glyph="&#9664;"
        />
      )}
      <ImageSlide url={image[currentImage]} />
      {currentImage !== image.length - 1
      && (
        <ArrowRight
          direction="right"
          clickFunction={nextSlide}
          glyph="&#9654;"
        />
      )}
    </div>
  );
};

export default ImageGallery;
