import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function TransactionModal({ show, handleClose, handleChange, handleSubmit, form, editTransaction, membres, comptes }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editTransaction ? 'Modifier une Transaction' : 'Enregistrer une Transaction'}</Modal.Title>
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
                                    {membre.nom}
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
                        <Form.Label>Type de transaction</Form.Label>
                        <Form.Select name="type_transaction" value={form.type_transaction} onChange={handleChange} required>
                            <option value="">-- Sélectionner un type --</option>
                            <option value="DEPOT">DEPOT</option>
                            <option value="RETRAIT">RETRAIT</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant de la transaction</Form.Label>
                        <Form.Control type="number" name="montant" value={form.montant} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editTransaction ? 'Modifier' : 'Enregistrer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default TransactionModal;
