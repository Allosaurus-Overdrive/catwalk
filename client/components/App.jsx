import React, { useState } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import axios from 'axios';
import ProductOverview from './Product_Overview/ProductOverview';
import Questions from './questionsAndanswers/Questions';
import Reviews from './Reviews/reviews';
import { RelatedProducts } from './related/related';
import Outfits from './related/outfits';

const Divider = styled.div`
  width: 100%;
  height: 7rem;
`;
const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  `;

const lightTheme = {
  body: '#FFF',
  text: '#363537',
  toggleBorder: '#FFF',
  background: '#363537',
};

const darkTheme = {
  body: '#4A4E69',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  background: '#999',
};

const App = () => {
  const [productOverviewId, setProductOverviewId] = useState(20111);
  const [theme, setTheme] = useState('light');
  const [buttonName, setButtonName] = useState('Dark Mode');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    buttonName === 'Dark Mode' ? setButtonName('Light Mode') : setButtonName('Dark Mode');
  };

  const productClickHandler = (clickedId) => {
    setProductOverviewId(clickedId);
  };

  const clickTracker = (element, module) => {
    axios.post('/clicktracker', { element, modulecomponent: module })
      .catch((err) => console.log('error in storing click data: ', err));
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div>
          <button type="button" onClick={themeToggler}>{buttonName}</button>
          <ProductOverview
            productOverviewId={productOverviewId}
            clickTracker={clickTracker}
          />
          <Divider />
          <RelatedProducts
            productOverviewId={productOverviewId}
            productClickHandler={productClickHandler}
            clickTracker={clickTracker}
          />
          <Outfits
            productOverviewId={productOverviewId}
            clickTracker={clickTracker}
          />
          <Divider />
          <Questions productOverviewId={productOverviewId} />
          <Divider />
          <Reviews productOverviewId={productOverviewId} clickTracker={clickTracker} />
        </div>
      </>
    </ThemeProvider>

  );
};

export default App;
