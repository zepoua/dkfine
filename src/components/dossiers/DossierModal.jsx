import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DossierModal({ show, handleClose, handleChange, handleSubmit, form, membres, comptes }) {
  return (
    <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
      <Modal.Header closeButton>
        <Modal.Title>Enregistrer un Dossier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Date d'ouverture du dossier</Form.Label>
            <Form.Control type="date" name="date_ouverture" value={form.date_ouverture} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Membre</Form.Label>
            <Form.Select name="membre_id" value={form.membre_id} onChange={handleChange} required>
              <option value="">-- Sélectionner le membre --</option>
              {membres.map((membre) => (
                <option key={membre.id} value={membre.id}>
                  {membre.nom} / {membre.prenom}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numero de compte</Form.Label>
            <Form.Select name="compte_id" value={form.compte_id} onChange={handleChange} required>
              <option value="">-- Sélectionner le compte --</option>
              {comptes.map((compte) => (
                <option key={compte.id} value={compte.id}>
                  {compte.numero_compte}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Montant du pret</Form.Label>
            <Form.Control type="number" name="montant" value={form.montant} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Frais de dossier</Form.Label>
            <Form.Control type="number" name="cout" value={form.cout} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default DossierModal;
