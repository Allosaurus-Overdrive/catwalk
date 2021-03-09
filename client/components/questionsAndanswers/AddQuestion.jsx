import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Modal from 'react-modal';

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
      refresh();
    }).catch((err) => console.log('error adding a question', err));
  }

  Modal.setAppElement('#app');

  return (
    <div>
      <button type="button" onClick={() => setModalStatus(true)}>ADD A QUESTION +</button>
      <Modal
        isOpen={modalStatus}
        onRequestClose={() => setModalStatus(false)}
        style={customStyles}
        contentLabel="add-question-modal"
      >
        <div className="modal-header">
          <h2>Ask a Question</h2>
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
              Name:
              <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
            </label>
            <label htmlFor="user-added-questions">
              Email:
              <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            </label>
            <label htmlFor="user-added-questions">
              Question:
              <input
                type="text"
                placeholder="What are you curious about?"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <input type="submit" value="Add" disabled={body.length === 0 || email.length === 0 || name.length === 0} />
          </form>
        </div>
      </Modal>
    </div>
  );
}

AddQuestion.propTypes = {
  product: PropTypes.number.isRequired,
  refresh: PropTypes.func.isRequired,
};
