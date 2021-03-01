import React, { useState } from 'react';
import axios from 'axios';
import config from '../../../server/config';

const options = {
  headers: {
    Authorization: `${config.TOKEN}`,
  },
};

const ImageGallery = () => {
  const [image, setImage] = useState('');

  const getImages = () => axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-sea/products/20111/styles', options)
    .then((response) => (
      setImage(response.data.results[0].photos[0].url)
    ))
    .catch((err) => {
      throw err;
    });

  getImages();

  return (
    <img className="fit-picture" src={image} alt="" />
  );
};

export default ImageGallery;
