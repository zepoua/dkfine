import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CompteModal({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  form,
  editingCompte,
  membres = []
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{editingCompte ? 'Modifier Compte' : 'Créer Compte'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Numéro de compte</Form.Label>
            <Form.Control
              type="text"
              name="numero_compte"
              value={form.numero_compte}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Type de compte</Form.Label>
            <Form.Select
              name="type_compte"
              value={form.type_compte}
              onChange={handleChange}
              required
            >
              <option value="">-- Sélectionner un type --</option>
              <option value="Epargne">Épargne</option>
              <option value="Courant">Courant</option>
            </Form.Select>
            </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Solde</Form.Label>
            <Form.Control
              type="number"
              name="solde"
              value={form.solde}
              onChange={handleChange}
              required
              disabled={editingCompte}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Part sociale</Form.Label>
            <Form.Control
              type="number"
              name="part_social"
              value={form.part_social}
              onChange={handleChange}
              disabled={true}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Part minimale</Form.Label>
            <Form.Control
              type="number"
              name="part_minimal"
              value={form.part_minimal}
              onChange={handleChange}
              disabled={true}
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

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>État du compte</Form.Label>
              <Form.Select
                name="etat"
                value={form.etat}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir un état --</option>
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Suspendu">Suspendu</option>
              </Form.Select>
            </Form.Group>

            {/* ... bouton submit ... */}
          </Form>


          <Button variant="primary" type="submit">
            {editingCompte ? 'Modifier' : 'Créer'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CompteModal;
