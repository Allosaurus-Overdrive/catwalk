import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// need to get the productID of the current page. Maybe from alex's overview component where he stores the id?

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

// single product card component, given what it has from props
// use example data for now
// write styled components outside of the actual functional component itself...

const RelatedCardWrapper = styled.section`
  font-family: 'Roboto', sans-serif;
  width: 200px;
  height: 300px;
  background: white;
  margin: auto;
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

function ProductCard(props) {
  return (
    <RelatedCardWrapper className="related-card-wrapper">
      <RelatedImage className="related-image" src={exampleGetStyles.results[0].photos[0].thumbnail_url} alt="Model wearing selected style" />
      <RelatedOverview className="related-overview">
        <RelatedCategory className="related-category">{exampleGetProduct.category}</RelatedCategory>
        <RelatedName className="related-name">{exampleGetProduct.name}</RelatedName>
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
// function RelatedProducts(props) {
//   return (

//   );
// }

// export whole list of related products at the end, update the export
export default ProductCard;
