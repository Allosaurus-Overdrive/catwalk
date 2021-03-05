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

const StyleSelector = ({ productOverviewId }) => {
  const [thumbnail, setThumbnail] = useState([]);

  const getThumbnail = () => axios.get('/styles', { params: { id: productOverviewId } })
    .then(({ data }) => (
      setThumbnail(data.results)
    ))
    .catch((err) => {
      throw err;
    });

  useEffect(() => {
    getThumbnail();
  }, [productOverviewId]);

  return (
    <div>
      {thumbnail.map((style) => (
        <RoundImg key={style.name} src={style.photos[0].thumbnail_url} alt="" />
      ))}
    </div>
  );
};

export default StyleSelector;
