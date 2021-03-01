import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../server/config';

const options = {
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const StyleSelector = () => {
  const [thumbnail, setThumbnail] = useState('');

  const getThumbnail = () => axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111/styles', options)
    .then((response) => (
      setThumbnail(response.data.results[0].photos[0].thumbnail_url)
    ))

  getThumbnail();

  return (
  <div>
    <button type="button" className="style">{thumbnail}</button>
  </div>
  );
};

export default StyleSelector;
