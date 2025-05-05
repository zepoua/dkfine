import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, ModalClose, handleConfirm}) => {
  return (
    <Modal show={show} onHide={ModalClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Voulez-vous vraiment supprimer cet element ?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ModalClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
