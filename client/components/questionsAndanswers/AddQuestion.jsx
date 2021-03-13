/* eslint-disable no-console */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import Modal from 'react-modal';

const Button = styled.button`
  border: 1px;
  border-style: solid;
  background-color: white;
  font-size: 12px;
  padding: 15px;
  border-color: darkslategray;
  font-weight: 600;
  color: black;
  outline: none;
`;

const Container = styled.div`
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  background-color: white;
`;

const ModalTitle = styled.h3`
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 120%;
  color: #747474;
  display: block;
  text-transform: uppercase;
  text-align: center;
  margin-top: 1.5rem;
`;

const ModalSubtitle = styled.h4`
  font-size: 80%;
  text-transform: none;
  margin-block-start: 0;
  font-weight: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border-style: solid;
  border-radius: 3px;
  border-width: 1px;
`;

const QuestionLabel = styled.label`
  display: block;
  font-family: 'Roboto', sans-serif;
  font-weight: 100;
  font-size: 90%;
  color: black;
`;

const QuestionHelpText = styled.p`
  font-size: 80%;
  color: red;
`;

const AddButton = styled.input`
  margin: 30px auto;
  margin-bottom: 5px;
  display: block;
`;

export default function AddQuestion(props) {
  const { product, refresh } = props;
  const [modalStatus, setModalStatus] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const postObj = {
    body,
    name,
    email,
    product_id: product,
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios.post('/qa/questions', postObj)
      .then(() => {
        console.log('Added Question', postObj);
        // refresh();
      }).catch((err) => console.log('error adding a question', err));
  }

  Modal.setAppElement('#app');

  return (
    <Container>
      <Button type="button" onClick={() => setModalStatus(true)}>ADD A QUESTION +</Button>
      <Modal
        isOpen={modalStatus}
        onRequestClose={() => setModalStatus(false)}
        style={customStyles}
        contentLabel="add-question-modal"
      >
        <div className="modal-header">
          <ModalTitle>
            Ask a Question
            <ModalSubtitle>about this product</ModalSubtitle>
          </ModalTitle>
          <CloseButton
            type="button"
            className="close-modal"
            onClick={() => setModalStatus(false)}
          >
            &times;
          </CloseButton>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => { handleSubmit(e); setModalStatus(false); }}>
            <QuestionLabel htmlFor="user-added-questions">
              What is Your Nickname: &nbsp;
              <input
                type="text"
                placeholder="jackson11!"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength="60"
                required
              />
              <QuestionHelpText>
                For privacy reasons, do not use your full name or email address
              </QuestionHelpText>
            </QuestionLabel>
            <QuestionLabel htmlFor="user-added-questions">
              Your Email: &nbsp;
              <input
                type="text"
                size="45"
                placeholder="jackson11!@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <QuestionHelpText>
                For authentication reasons, you will not be emailed
              </QuestionHelpText>
            </QuestionLabel>
            <QuestionLabel htmlFor="user-added-questions">
              Your Question: &nbsp;
              <input
                type="text"
                size="50"
                placeholder="What are you curious about?"
                onChange={(e) => setBody(e.target.value)}
                maxLength="1000"
                value={body}
                required
              />
            </QuestionLabel>
            <AddButton type="submit" value="Add Question" disabled={body.length === 0 || email.length === 0 || name.length === 0} />
          </form>
        </div>
      </Modal>
    </Container>
  );
}

AddQuestion.propTypes = {
  product: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};
