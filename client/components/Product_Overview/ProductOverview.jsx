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
  padding: 10px 10px 10px 10px;
  height: 900px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

const Column1Row1 = styled.div`
  height: 700px;
  grid-column: 1;
  place-self: center;
  background-color: light gray;
  background-size: 100%;
`;

const Buttons = styled.div`
  grid-column: 2/3;
  grid-row: 1;
  align-self: end;
`;

const ProductInfoPos = styled.div`
  grid-column: 2/3;
  grid-row: 1;
  align-self: start;
`;

const Row2 = styled.div`
  grid-column: 1/3;
  grid-row: 2
`;

// **Functionality Section** //

const ProductOverview = ({ productOverviewId }) => {
  // **States**//
  const [results, setResults] = useState({});
  const [description, setDescription] = useState('');
  const [slogan, setSlogan] = useState('');
  const [features, setFeatures] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
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
      setPrice(response.data.default_price);
    })
    .catch((err) => {
      throw err;
    });

  const getStyle = () => axios.get('/styles', { params: {id: productOverviewId } })
    .then(({ data }) => (
      (setBigImage(() => []),
      setThumbnail(() => []),
      setResults(data.results[0].skus),
      setThumbnail(data.results),
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
  }, [productOverviewId]);

  // **Render**//
  return (
    <Layout>
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
        />
      </ProductInfoPos>
      <Buttons>
        <StyleSelector
          thumbnail={thumbnail}
          setCurrentImage={setCurrentImage}
        />
        <AddToCart results={results} productOverviewId={productOverviewId} />
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
