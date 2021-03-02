import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// TO-DOS:
// get the productID of the current page from alex's overview component where he stores the id?
// import the ratings star function from sheeba
// store state of

const exampleGetProduct = {
  id: 20111,
  campus: 'hr-sea',
  name: 'Murl Dress',
  slogan: 'Non ducimus maxime.',
  description: 'Distinctio nostrum odit mollitia qui. Officia veritatis a aut velit et laudantium. Repellendus sint voluptatem et.',
  category: 'Dress',
  default_price: 817.00,
  created_at: '2021-02-24T19:34:41.281Z',
  updated_at: '2021-02-24T19:34:41.281Z',
  features: [
    {
      feature: 'Cut',
      value: 'Skinny',
    },
    {
      feature: 'Fair Trade Certified',
      value: null,
    },
    {
      feature: 'Non-GMO',
      value: null,
    },
    {
      feature: 'Lens',
      value: '"100% UV Protective"',
    },
  ],
};

const exampleGetStyles = {
  product_id: 20111,
  results: [
    {
      style_id: 110038,
      name: 'Azure',
      original_price: 817.00,
      sale_price: null,
      'default?': true,
      photos: [
        {
          thumbnail_url: 'https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
          url: 'https://images.unsplash.com/photo-1519330377309-9ee1c6783348?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
        },
      ],
      skus: {
        638588: {
          quantity: 0,
          size: 'XS',
        },
        638589: {
          quantity: 31,
          size: 'S',
        },
        638590: {
          quantity: 47,
          size: 'M',
        },
        638591: {
          quantity: 24,
          size: 'L',
        },
        638592: {
          quantity: 25,
          size: 'XL',
        },
        638593: {
          quantity: 58,
          size: 'XXL',
        },
      },
    },
  ],
};

const exampleProducts = [
  {
    id: 20111,
    campus: 'hr-sea',
    name: 'Murl Dress',
    slogan: 'Non ducimus maxime.',
    description: 'Distinctio nostrum odit mollitia qui. Officia veritatis a aut velit et laudantium. Repellendus sint voluptatem et.',
    category: 'Dress',
    default_price: 817.00,
    created_at: '2021-02-24T19:34:41.281Z',
    updated_at: '2021-02-24T19:34:41.281Z',
    features: [
      {
        feature: 'Cut',
        value: 'Skinny',
      },
      {
        feature: 'Fair Trade Certified',
        value: null,
      },
      {
        feature: 'Non-GMO',
        value: null,
      },
      {
        feature: 'Lens',
        value: '"100% UV Protective"',
      },
    ],
  },
  {
    id: 20222,
    campus: 'hr-sea',
    name: 'Another Shirt',
    slogan: 'Non ducimus maxime.',
    description: 'Distinctio nostrum odit mollitia qui. Officia veritatis a aut velit et laudantium. Repellendus sint voluptatem et.',
    category: 'Top',
    default_price: 820.00,
    created_at: '2021-02-24T19:34:41.281Z',
    updated_at: '2021-02-24T19:34:41.281Z',
    features: [
      {
        feature: 'Cut',
        value: 'Skinny',
      },
      {
        feature: 'Fair Trade Certified',
        value: null,
      },
      {
        feature: 'Non-GMO',
        value: null,
      },
      {
        feature: 'Lens',
        value: '"100% UV Protective"',
      },
    ],
  },
  {
    id: 20333,
    campus: 'hr-sea',
    name: 'Some Pants',
    slogan: 'Non ducimus maxime.',
    description: 'Distinctio nostrum odit mollitia qui. Officia veritatis a aut velit et laudantium. Repellendus sint voluptatem et.',
    category: 'Bottom',
    default_price: 820.00,
    created_at: '2021-02-24T19:34:41.281Z',
    updated_at: '2021-02-24T19:34:41.281Z',
    features: [
      {
        feature: 'Cut',
        value: 'Skinny',
      },
      {
        feature: 'Fair Trade Certified',
        value: null,
      },
      {
        feature: 'Non-GMO',
        value: null,
      },
      {
        feature: 'Lens',
        value: '"100% UV Protective"',
      },
    ],
  },
  {
    id: 20555,
    campus: 'hr-sea',
    name: 'A Purse',
    slogan: 'Non ducimus maxime.',
    description: 'Distinctio nostrum odit mollitia qui. Officia veritatis a aut velit et laudantium. Repellendus sint voluptatem et.',
    category: 'Accessory',
    default_price: 820.00,
    created_at: '2021-02-24T19:34:41.281Z',
    updated_at: '2021-02-24T19:34:41.281Z',
    features: [
      {
        feature: 'Cut',
        value: 'Skinny',
      },
      {
        feature: 'Fair Trade Certified',
        value: null,
      },
      {
        feature: 'Non-GMO',
        value: null,
      },
      {
        feature: 'Lens',
        value: '"100% UV Protective"',
      },
    ],
  },
];

// single product card component, given what it has from props
// use example data for now
// write styled components outside of the actual functional component itself...

// RELATED PRODUCT CARD STYLED COMPONENTS

const RelatedCardWrapper = styled.li`
  font-family: 'Roboto', sans-serif;
  display: inline-block;
  width: 200px;
  height: 300px;
  background: white;
  margin: auto 10px;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  position: relative;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(0.95);
  transition: box-shadow 0.5s, transform 0.5s;
  &:hover{
    transform: scale(1);
    box-shadow: 5px 20px 30px rgba(0,0,0,0.2);
  }
`;

const RelatedImage = styled.img`
  height: 67%;
  width: 100%;
  background: no-repeat center center;
  object-fit: cover;
`;

const RelatedIcon = styled.i`
  color: white;
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 1;
  &:hover{
    color: gold;
  }
`;

const RelatedOverview = styled.section`
  padding: 0px 10px;
`;

const RelatedCategory = styled.h3`
  font-weight: 100;
  font-size: 70%;
  color: grey;
  text-transform: uppercase;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedName = styled.h3`
  font-weight: 400;
  font-size: 100%;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedPrice = styled.h3`
  font-weight: 100;
  font-size: 70%;
  color: grey;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

// RELATED PRODUCT LIST STYLED COMPONENTS

const RelatedProductsWrapper = styled.section`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 300px;
  width: 80%;
  background: white;
  margin: 10px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
`;

const RelatedProductsList = styled.ul`
  display: inline;
  padding-inline-start: 0;
  margin: auto;
  position: relative;
`;

const RelatedLeftButton = styled.button`
  font-size: 150%;
  float: left;
  margin: 125px 0px;
  padding: 0;
  height: 50px;
  width: 50px;
`;

const RelatedRightButton = styled.button`
  font-size: 150%;
  float: right;
  margin: 125px 0px;
  padding: 0;
  height: 50px;
  width: 50px;
`;

// one product card
function ProductCard(props) {
  return (
    <RelatedCardWrapper className="related-card-wrapper">
      <RelatedIcon className="far fa-star" />
      <RelatedImage className="related-image" src={exampleGetStyles.results[0].photos[0].thumbnail_url} alt="Model wearing selected style" />
      <RelatedOverview className="related-overview">
        <RelatedCategory className="related-category">{props.item.category}</RelatedCategory>
        <RelatedName className="related-name">{props.item.name}</RelatedName>
        <RelatedPrice className="related-price">
          $
          {exampleGetStyles.results[0].original_price}
        </RelatedPrice>
        <div className="related-rating">*****</div>
      </RelatedOverview>
    </RelatedCardWrapper>
  );
}

// list of product cards
function RelatedProducts(props) {
  return (
    <div>
      <RelatedLeftButton className="left" type="button"> &#8592; </RelatedLeftButton>
      <RelatedProductsWrapper>
        <RelatedProductsList>
          {exampleProducts.map((item) => (
            <ProductCard item={item} key={item.id} />
          ))}
        </RelatedProductsList>
      </RelatedProductsWrapper>
      <RelatedRightButton className="right" type="button"> &#8594; </RelatedRightButton>
    </div>
  );
}

// export whole list of related products at the end, update the export
export default RelatedProducts;
