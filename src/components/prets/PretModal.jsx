import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function PretModal({ show, handleClose, handleChange, handleSubmit, form, editPret, dossiers }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editPret ? 'Modifier un Pret' : 'Enregistrer un Pret'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date d'enregistrement</Form.Label>
                        <Form.Control type="date" name="date_pret" value={form.date_pret} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date debut de remboursement</Form.Label>
                        <Form.Control type="date" name="date_debut" value={form.date_debut} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Membre</Form.Label>
                        <Form.Select name="dossier_pret_id" value={form.dossier_pret_id} onChange={handleChange} required>
                            <option value="">-- Sélectionner le dossier --</option>
                            {dossiers.map((dossier) => (
                                <option key={dossier.id} value={dossier.id}>
                                {dossier.code} / {dossier.nom} / {dossier.prenom}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duree du remboursement (mois)</Form.Label>
                        <Form.Control type="number" name="mois" value={form.mois} onChange={handleChange} />
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
