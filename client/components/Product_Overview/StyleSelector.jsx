import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// **Styling Tempelates**//

const RoundImg = styled.img`
  border: solid black;
  border-radius: 50%;
  height: 75px;
  width: 75px;
`;

// **Functionality Section** //

const StyleSelector = () => {
  const [thumbnail, setThumbnail] = useState([]);

  const getThumbnail = () => axios.get('/products/20111/styles')
    .then(({ data }) => (
      setThumbnail(data.results)
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getThumbnail();
  }, []);

  return (
    <div>
      {thumbnail.map((style) => (
        <RoundImg key={style.name} src={style.photos[0].thumbnail_url} alt="" />
      ))}
    </div>
  );
};

export default StyleSelector;
