import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PhotoDiv = styled.div`
display: inline-block;
padding: 4px;
`;

export default function PhotoDisplay({ photos }) {
  if (photos.length !== 0) {
    return (
      <div>
        {photos.map((photo) => (
          <PhotoDiv>
            <img
              key={photo.id}
              src={photo.url}
              alt="customer-answer"
              width="60"
              height="45"
              border="1px solid darkslategrey"
            />
          </PhotoDiv>
        ))}
      </div>
    );
  }
  return null;
}

PhotoDisplay.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
