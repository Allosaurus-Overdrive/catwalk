import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');
function AddReview() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setModalIsOpen(true)} style={{ margin: '1.5em' }}>
        Add Review
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={
         { overlay: { backgroundColor: 'grey' }, content: { color: 'teal', fontSize: '18px' } }
        }
      >
        <h2>Modal title</h2>
        <p>Modal body</p>
        <button type="button" onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}

export default AddReview;
