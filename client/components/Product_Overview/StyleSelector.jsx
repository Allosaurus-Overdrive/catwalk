import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// **Styling Tempelates**//

const RoundImg = styled.img`
  border: solid black;
  border-radius: 50%;
  height: 75px;
  width: 75px;
  margin: 10px 10px 10px 10px;
`;

const StyleNameStyles = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 10px 10px 10px;
`;

// **Functionality Section** //

const StyleSelector = ({ productOverviewId }) => {
  const [thumbnail, setThumbnail] = useState([]);
  const [styleName, setStyleName] = useState('');

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
      <StyleNameStyles>{styleName}</StyleNameStyles>
      {thumbnail.map((style) => (
        <RoundImg key={style.name} src={style.photos[0].thumbnail_url} alt="" onClick={() => { setStyleName(style.name); }} />
      ))}
    </div>
  );
};

export default StyleSelector;
