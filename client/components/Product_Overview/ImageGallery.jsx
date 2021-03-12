import React from 'react';
import styled from 'styled-components';
import ImageSlide from './ImageSlide';

// **Styling Templates** //

const ImagePos = styled.div`
  height: 700px;
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  grid-template-rows: 1fr;
  background-color: lightgray;
`;

const ThumbnailStyle = styled.img`
  grid-column: 1;
  width: 75px;
  border: solid 2px;
  margin: 10px 20px 10px 20px;
`;

const ThumbnailPos = styled.div`
  width: 150;
  height: auto;
  grid-column: 1;
  grid-row: 1;
  display: grid;
  overflow-y: scroll;
`;

const Arrow1 = styled.div`
  grid-column: 2;
  grid-row: 1;
  place-self: center;
`;

const ImageStyle = styled.div`
  width: 450;
  heigth: auto;
  grid-column: 3;
  place-self: center;
`;

const Arrow2 = styled.div`
  grid-column: 4;
  place-self: center;
`;

// **Functionality Section** //

const ImageGallery = ({ galleryThumbnail, bigImage, setCurrentImage, currentImage
}) => {
  // const [currentImage, setCurrentImage] = useState(0);

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
        {galleryThumbnail.map((pic, idx) => (
          <ThumbnailStyle key={pic} src={pic} alt="" onClick={() => { setCurrentImage(idx); }} />
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
// overflow-y: 'scroll'
export default ImageGallery;
