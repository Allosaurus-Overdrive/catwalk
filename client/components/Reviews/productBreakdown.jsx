import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './progressBar';

const attributes = {
  Size: {
    1: 'A size too small',
    2: '1/2 size too small',
    3: 'Perfect',
    4: '1/2 size too big',
    5: 'A size too big',
  },
  Width: {
    1: 'Too narrow',
    2: 'Slightly narrow',
    3: 'Perfect',
    4: 'Slightly wide',
    5: 'Too wide',
  },
  Comfort: {
    1: 'Uncomfortable',
    2: 'Slightly uncomfortable',
    3: 'Ok',
    4: 'Comfortable',
    5: 'Perfect',
  },
  Quality: {
    1: 'Poor',
    2: 'Below average',
    3: 'Expected',
    4: 'Pretty great',
    5: 'Perfect',
  },
  Length: {
    1: 'Runs short',
    2: 'Slightly short',
    3: 'Perfect',
    4: 'Slightly long',
    5: 'Runs long',
  },
  Fit: {
    1: 'Runs tight',
    2: 'Slightly tight',
    3: 'Perfect',
    4: 'Slightly loose',
    5: 'Runs loose',
  },
};

const Characteristics = ({ characteristics }) => {
  const qualities = characteristics;
  const quals = Object.keys(qualities);

  const percentArr = [];
  for (const quality in qualities) {
    if (Object.prototype.hasOwnProperty.call(qualities, quality)) {
      const completed = Math.round(100 * (qualities[quality].value / 5));
      percentArr.push(completed);
    }
  }

  return (
    <div>
      <div
        className="quality"
        style={{
          float: 'center', margin: '1em', padding: '1em', width: '350px', display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between', lineHeight: '30px',
        }}
      >
        {quals.map((quality, idx) => (
          <fragment key={quality.id}>
            <span style={{ position: 'relative', top: '3px' }}>
              <strong>{quality}</strong>
            </span>
            <ProgressBar bgcolor="grey" border-radius="0px" completed={percentArr[idx]} />
            <span>
              {attributes[quality]['1']}
            </span>
            <span style={{ position: 'relative', right: '40px', float: 'right' }}>
              {attributes[quality]['5']}
            </span>
          </fragment>
        ))}
      </div>
    </div>
  );
};

export default Characteristics;
