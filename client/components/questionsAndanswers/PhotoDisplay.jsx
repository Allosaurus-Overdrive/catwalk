import React from 'react';
import PropTypes from 'prop-types';

export default function PhotoDisplay({ photos }) {
  if (photos.length !== 0) {
    return (
      <div>
        {photos.map((photo) => (
          <img key={photo.id} src={photo.url} alt="customer-answer" width="40" height="40" />
        ))}
      </div>
    );
  }
  return null;
}

PhotoDisplay.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
