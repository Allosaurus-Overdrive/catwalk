import React, { useState } from 'react';
import Modal from 'react-modal';

export default function AddQuestion() {
  const [modalStatus, setModalStatus] = useState(false);

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

  return (
    <div>
      <button type="button" onClick={() => setModalStatus(true)}>ADD A QUESTION +</button>
      <Modal
        isOpen={modalStatus}
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
          <form>
            <label htmlFor="user-added-questions">
              Question:
              <input type="text" placeholder="What are you curious about?" />
            </label>
            <input type="submit" value="Add" />
          </form>
        </div>
      </Modal>
    </div>
  );
}
