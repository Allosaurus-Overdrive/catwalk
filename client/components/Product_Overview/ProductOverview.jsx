import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import Description from './Description';

// **Styling Tempelates** //

const Layout = styled.div`
  max-width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 1000px;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 1fr;
  grid-template-rows: 1fr 2fr 1fr;
`;

const Column1Row1 = styled.div`
  height: 700px;
  grid-column: 2;
  grid-row: 2;
  place-self: center;
  background-color: lightgray;
  background-size: 100%;
`;

const Buttons = styled.div`
  grid-column: 3/4;
  grid-row: 2;
  align-self: end;
`;

const ProductInfoPos = styled.div`
  grid-column: 3/4;
  grid-row: 2;
  align-self: start;
`;

const Row2 = styled.div`
  grid-column: 2/5;
  grid-row: 3;
`;

const TopBar = styled.div`
  grid-row: 1;
  grid-column: 2/4;
  background-color: dimgray;
  margin-bottom: 20px;
  height: 75px;
`;

const TopText = styled.div`
  font-family: 'Monoton', cursive;
  color: white;
  font-size: 25px;
  margin-top: 20px;
  margin-left: 15px;
  float: left;
`;

const TopSearchBar = styled.div`
  color: white;
  margin-right: 30px;
  margin-top: 30px;
  float: right;
  font-size: 90%;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
`;

const TopAnnouncements = styled.div`
  grid-row: 1;
  grid-column: 2/4;
  margin-top: 85px;
  color: gray;
  font-size: 90%;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  text-align: center;
`;

// **Functionality Section** //

const ProductOverview = ({ productOverviewId, clickTracker }) => {
  // **States**//
  const [results, setResults] = useState({});
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [features, setFeatures] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [salesPrice, setSalesPrice] = useState('');
  const [bigImage, setBigImage] = useState([]);
  const [galleryThumbnail, setGalleryThumbnail] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // **Axios Requests** //
  const getProduct = () => axios.get('/products', { params: { id: productOverviewId } })
    .then((response) => {
      setSlogan(response.data.slogan);
      setDescription(response.data.description);
      setFeatures(response.data.features);
      setName(response.data.name);
      setCategory(response.data.category);
    })
    .catch((err) => {
      throw err;
    });

  const getStyle = () => axios.get('/styles', { params: {id: productOverviewId } })
    .then(({ data }) => (
      (setBigImage(() => []),
      setGalleryThumbnail(() => []),
      setThumbnail(() => []),
      setResults(data.results[currentImage].skus),
      setThumbnail(data.results),
      setPrice(data.results[currentImage].original_price),
      setSalesPrice(data.results[currentImage].sale_price),
      data.results.map((style) => (
        (setBigImage((arr) => [...arr, style.photos[0].url]),
        setGalleryThumbnail((arr) => [...arr, style.photos[0].thumbnail_url]))))
      )))
    .catch((err) => {
      throw err;
    });

  // **Effect/ComponentDidMount** //
  useEffect(() => {
    getProduct();
    getStyle();
  }, [currentImage, productOverviewId]);

  // **Render**//
  return (
    <Layout>
      <TopBar>
        <TopText>OO      OVERDRIVE OUTFITS</TopText>
      </TopBar>
      <TopAnnouncements>
        <em>SITE WIDE ANNOUNCEMENT MESSAGE!</em>
        &nbsp; &mdash; SALE / DISCOUNT&nbsp;
        <b>OFFER</b>
        &nbsp; &mdash; &nbsp;
        <u>NEW PRODUCT HIGHLIGHT</u>
      </TopAnnouncements>
      <Column1Row1>
        <ImageGallery
          galleryThumbnail={galleryThumbnail}
          bigImage={bigImage}
          setCurrentImage={setCurrentImage}
          currentImage={currentImage}
        />
      </Column1Row1>
      <ProductInfoPos>
        <ProductInfo
          name={name}
          category={category}
          price={price}
          salesPrice={salesPrice}
          productOverviewId={productOverviewId}
        />
      </ProductInfoPos>
      <Buttons>
        <StyleSelector
          thumbnail={thumbnail}
          setCurrentImage={setCurrentImage}
          clickTracker={clickTracker}
        />
        <AddToCart
          results={results}
          productOverviewId={productOverviewId}
          clickTracker={clickTracker}
        />
      </Buttons>
      <Row2>
        <Description
          description={description}
          slogan={slogan}
          features={features}
        />
      </Row2>
    </Layout>
  );
};

export default ProductOverview;
