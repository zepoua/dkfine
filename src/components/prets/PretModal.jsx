import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PretModal({ show, handleClose, handleChange, handleSubmit, form, editPret, membres, comptes }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editPret ? 'Modifier un Pret' : 'Enregistrer un Pret'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date du pret</Form.Label>
                        <Form.Control type="date" name="date_debut" value={form.date_debut} onChange={handleChange} required />
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
                        <Form.Label>Type de Taux</Form.Label>
                        <Form.Select name="type_taux" value={form.type_taux} onChange={handleChange} required>
                            <option value="">-- Sélectionner un type --</option>
                            <option value="FIXE">FIXE</option>
                            <option value="DEGRESSIF">DEGRESSIF</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Taux</Form.Label>
                        <Form.Control type="number" name="taux" value={form.taux} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Frais de dossier</Form.Label>
                        <Form.Control type="number" name="frais_dossier" value={form.frais_dossier} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant du pret</Form.Label>
                        <Form.Control type="number" name="montant" value={form.montant} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editPret ? 'Modifier' : 'Enregistrer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default PretModal;
