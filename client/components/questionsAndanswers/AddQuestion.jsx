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
color: darkslategray
outline: none
`;

const Container = styled.div`
display: inline-block;
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

  function handleSubmit(e) {
    e.preventDefault();

    axios.post(`/qa/questions/${product}`, {
      body,
      name,
      email,
      product_id: product,
    }).then(() => {
      console.log('Added Question');
      refresh();
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
          <h2>Ask a Question</h2>
          <p>About the product_name</p>
          <button
            type="button"
            className="close-modal"
            onClick={() => setModalStatus(false)}
          >
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={(e) => { handleSubmit(e); setModalStatus(false); }}>
            <label htmlFor="user-added-questions">
              What is Your Nickname:
              <input
                type="text"
                placeholder="jackson11!"
                onChange={(e) => setName(e.target.value)}
                value={name}
                maxLength="60"
                required
              />
              For privacy reasons, do not use your full name or email address
            </label>
            <label htmlFor="user-added-questions">
              Your Email:
              <input
                type="text"
                placeholder="Why did you like the product or not?"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              For authentication reasons, you will not be emailed
            </label>
            <label htmlFor="user-added-questions">
              Your Question:
              <input
                type="text"
                placeholder="What are you curious about?"
                onChange={(e) => setBody(e.target.value)}
                maxLength="1000"
                value={body}
                required
              />
            </label>
            <input type="submit" value="Add" disabled={body.length === 0 || email.length === 0 || name.length === 0} />
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
