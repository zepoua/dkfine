import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function UserModal({ show, handleClose, handleChange, handleSubmit, form, editingUser }) {
  return (
    <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
      <Modal.Header closeButton>
        <Modal.Title>{editingUser ? 'Modifier Utilisateur' : 'Créer Utilisateur'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nom</Form.Label>
            <Form.Control type="text" name="nom" value={form.nom} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse</Form.Label>
            <Form.Control type="text" name="adresse" value={form.adresse} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control type="text" name="telephone" value={form.telephone} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role ID</Form.Label>
            <Form.Control type="number" name="role_id" value={form.role_id} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mot de passe {editingUser ? '(laisser vide pour ne pas changer)' : ''}</Form.Label>
            <Form.Control type="password" name="password" value={form.password} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de carnet recu</Form.Label>
            <Form.Control type="number" name="qte_carnet" value={form.qte_carnet} onChange={handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            {editingUser ? 'Modifier' : 'Créer'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UserModal;
