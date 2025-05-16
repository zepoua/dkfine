import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function RetraitModal({ show, handleClose, handleChange, handleSubmit, form, editRetrait, membres, carnets, cycles }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editRetrait ? 'Modifier un retrait' : 'Enregistrer un retrait'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date" value={form.date} onChange={handleChange} required />
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
                        <Form.Label>Le mois</Form.Label>
                        <Form.Select name="cycle_id" value={form.cycle_id} onChange={handleChange} required>
                            <option value="">-- Sélectionner le mois --</option>
                            {cycles.map((cycle) => (
                                <option key={cycle.id} value={cycle.id}>
                                    {cycle.mois}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant a retire</Form.Label>
                        <Form.Control type="number" name="montant_retire" value={form.montant_retire} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editRetrait ? 'Modifier' : 'Enregistrer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RetraitModal;
