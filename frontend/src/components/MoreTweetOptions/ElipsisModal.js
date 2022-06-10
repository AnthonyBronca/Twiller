import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import Elipsis from './Elipsis';

function ElipsisModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>TESTTT</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Elipsis />
        </Modal>
      )}
    </>
  );
}

export default ElipsisModal;
