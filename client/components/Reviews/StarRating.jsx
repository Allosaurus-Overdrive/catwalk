import React from 'react';
import { FaStar } from 'react-icons/fa';

function StarRating({ avgRating }) {
  return (
    <div style={{ position: 'relative', left: '20px', bottom: '24px' }}>
      {[...Array(5)].map((star, i) => (
        <label key={i}>
          <FaStar size={20} color={avgRating > (i + 0.5) ? '#ffc107' : 'lightgrey'} />
        </label>
      ))}
    </div>
  );
}

export default StarRating;
