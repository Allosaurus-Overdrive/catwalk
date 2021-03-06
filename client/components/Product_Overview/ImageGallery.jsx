import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';

// **Styling Templates** //

const ImagePos = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
  grid-template-rows: 1fr;
`;

const ThumbnailStyle = styled.img`
  grid-column: 2;
  width: 75px;
`;

const ThumbnailPos = styled.div`
  grid-column: 2;
  display: grid;
`;

const Arrow1 = styled.div`
  grid-column: 1;
  place-self: center;
`;

const ImageStyle = styled.div`
  grid-column: 3;
  place-self: center;
`;

const Arrow2 = styled.div`
  grid-column: 4;
  place-self: center;
`;

// **Functionality Section** //

const ImageGallery = ({ productOverviewId }) => {
  const [bigImage, setBigImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  const getImages = () => axios.get('/styles', { params: { id: productOverviewId } })
    .then((response) => (
      (setBigImage(() => []),
      setThumbnail(() => []),
      response.data.results.map((style) => (
        (setBigImage((arr) => [...arr, style.photos[0].url]),
        setThumbnail((thumbnail) => [...thumbnail, style.photos[0].thumbnail_url])
        )))
      )))
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
      <ThumbnailPos>
        {thumbnail.map((pic, idx) => (
          <ThumbnailStyle src={pic} alt="" onClick={() => { setCurrentImage(idx); }} />
        ))}
      </ThumbnailPos>
      <ImageStyle>
        <ImageSlide url={bigImage[currentImage]} />
      </ImageStyle>
      {currentImage !== bigImage.length - 1
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
