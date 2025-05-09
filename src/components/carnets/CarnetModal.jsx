import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CarnetModal({ show, handleClose, handleChange, handleSubmit, form, editingCarnet, membres }) {
  return (
    <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
      <Modal.Header closeButton>
        <Modal.Title>{editingCarnet ? 'Modifier Carnet' : 'Créer Carnet'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={form.date} // Date du jour
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Code</Form.Label>
            <Form.Control
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Membre</Form.Label>
            <Form.Select name="membre_id" value={form.membre_id} onChange={handleChange} required>
              <option value="">-- Sélectionner un membre --</option>
              {Array.isArray(membres) &&
                membres.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            {editingCarnet ? 'Modifier' : 'Créer'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CarnetModal;
