import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CotisationModal({ show, handleClose, handleChange, handleSubmit, form, editCotisation, membres, carnets }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editCotisation ? 'Modifier une cotisation' : 'Enregistrer une cotisation'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date_cotisation" value={form.date_cotisation} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Membre</Form.Label>
                        <Form.Select name="membre_id" value={form.membre_id} onChange={handleChange} required>
                            <option value="">-- Sélectionner le membre --</option>
                            {membres.map((membre) => (
                                <option key={membre.id} value={membre.id}>
                                    {membre.nom}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Code carnet</Form.Label>
                        <Form.Select name="carnet_id" value={form.carnet_id} onChange={handleChange} required>
                            <option value="">-- Sélectionner le carnet --</option>
                            {carnets.map((carnet) => (
                                <option key={carnet.id} value={carnet.id}>
                                    {carnet.code}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant a cotise</Form.Label>
                        <Form.Control type="number" name="montant" value={form.montant} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editCotisation ? 'Modifier' : 'Enregistrer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CotisationModal;
