import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const LogoutModal = ({ show, ModalClose, handleConfirm}) => {
  return (
    <Modal show={show} onHide={ModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous vraiment vous deconnectez ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ModalClose}>
          Non
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Oui
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
