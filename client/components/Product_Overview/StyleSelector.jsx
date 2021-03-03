import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import config from '../../../server/config';

const options = {
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const RoundImg = styled.img`
  border: solid black;
  border-radius: 50%;
  height: 100px;
  width: 100px;
`;

const StyleSelector = () => {
  const [thumbnail, setThumbnail] = useState('');

  const getThumbnail = () => axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111/styles', options)
    .then((response) => (
      setThumbnail(response.data.results[0].photos[0].thumbnail_url)
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getThumbnail();
    //,,,,,
  });

  return (
    <div>
      <RoundImg className="thumbnail" src={thumbnail} alt="" />
    </div>
  );
};

export default StyleSelector;
