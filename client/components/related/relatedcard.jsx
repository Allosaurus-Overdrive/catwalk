import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider, BaseModalBackground } from 'styled-react-modal';
import ModalContent from './modal';

//  //  //  //  //  //  //  //  //  //  //  //
// RELATED PRODUCT CARD STYLED COMPONENTS  //
//  //  //  //  //  //  //  //  //  //  ////

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
    cursor: pointer;
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

const RelatedSalePrice = styled.h3`
  display: inline-block;
  font-weight: 800;
  font-size: 70%;
  color: red;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const RelatedPrice = styled.h3`
  display: inline;
  font-weight: 100;
  font-size: 70%;
  text-decoration: ${(props) => (props.sale ? 'line-through' : 'none')};
  color: grey;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
`;

const StyledModal = Modal.styled`
  width: 40rem;
  height: 30rem;
  display: inline-block;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  position: relative;
`;

const ModalCloseButton = styled.button`
  font-weight: 100;
  font-size: 80%;
  display: inline-block;
  position: absolute;
  border-style: solid;
  border-color: grey;
  border-width: 1px;
  right: 1.5rem;
  top: 1.5rem;
`;

//  //  //  //  //  //  //  //  //  //  //  ////
// RELATED PRODUCT CARD FUNCTIONAL COMPONENT  /
//  //  //  //  //  //  //  //  //  //  //  //

function ProductCard(props) {
  const [isSale, useIsSale] = useState([false]);
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const toggleModal = () => {
    setOpacity(0);
    setIsOpen(!isOpen);
  };

  const afterOpen = () => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  };

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const salePrice = () => {
    if (props.styles[0].sale_price) {
      useIsSale([true, props.styles[0].sale_price]);
    }
  };

  useEffect(() => {
    salePrice();
  }, []);

  return (
    <RelatedCardWrapper className="related-card-wrapper">
      <RelatedIcon className="far fa-star" onClick={toggleModal} />
      <RelatedImage className="related-image" src={props.styles[0].photos[0].thumbnail_url} alt="Model wearing selected style" />
      <RelatedOverview className="related-overview">
        <RelatedCategory className="related-category">{props.item.category}</RelatedCategory>
        <RelatedName className="related-name">{props.item.name}</RelatedName>
        {!!isSale[0] && (
        <div>
          <RelatedSalePrice className="related-sale-price">
            $
            {props.styles[0].sale_price}
            &nbsp;
            &nbsp;
          </RelatedSalePrice>
          <RelatedPrice sale className="related-price">
            $
            {props.styles[0].original_price}
          </RelatedPrice>
        </div>
        )}
        {!isSale[0] && (
          <RelatedPrice className="related-price">
            $
            {props.styles[0].original_price}
          </RelatedPrice>
        )}
        <div className="related-rating">*****</div>
      </RelatedOverview>
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <ModalContent clickedFeatures={props.item.features} currentFeatures={props.currentFeatures} />
        <ModalCloseButton type="button" onClick={toggleModal}>CLOSE</ModalCloseButton>
      </StyledModal>
    </RelatedCardWrapper>
  );
}

export default ProductCard;
