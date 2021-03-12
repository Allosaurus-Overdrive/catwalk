import React, { useState } from 'react';
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

const StyleSelector = ({ thumbnail, setCurrentImage, clickTracker }) => {
  const [styleName, setStyleName] = useState('Azure');

  return (
    <div>
      <StyleNameStyles>{styleName}</StyleNameStyles>
      {thumbnail.map((style, idx) => (
        <RoundImg
          key={style.style_id}
          src={style.photos[0].thumbnail_url}
          alt=""
          onClick={() => { setStyleName(style.name); setCurrentImage(idx); clickTracker(`New Style Selected=${styleName}`, 'Style Selector'); }}
        />
      ))}
    </div>
  );
};

export default StyleSelector;
