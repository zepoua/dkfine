import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function MembreModal({ show, handleClose, handleChange, handleSubmit, form, editingMembre }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editingMembre ? 'Modifier Membre' : 'Créer Membre'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="nom"
              value={form.nom || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              type="text"
              name="prenom"
              value={form.prenom || ''}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date de naissance</Form.Label>
            <Form.Control
              type="date"
              name="date_naissance"
              value={form.date_naissance}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="text"
              name="telephone"
              value={form.telephone || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              name="adresse"
              value={form.adresse || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Pièce d'identité (image)</Form.Label>
            <Form.Control
              type="file"
              name="piece_identite"
              onChange={handleChange}
              accept="image/*"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {editingMembre ? 'Modifier' : 'Créer'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MembreModal;
