import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function DossierValModal({ show, handleClose, handleSubmit, form, setForm }) {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>Valider le dossier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Numero du dossier</Form.Label>
                        <Form.Control type="text" name="dossier" value={form.dossier} onChange={handleChange} disabled={true} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date de validation</Form.Label>
                        <Form.Control type="date" name="date_pret" value={form.date_pret} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Date debut de remboursement</Form.Label>
                        <Form.Control type="date" name="date_debut" value={form.date_debut} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Duree du remboursement (mois)</Form.Label>
                        <Form.Control type="number" name="mois" value={form.mois} onChange={handleChange} required/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default DossierValModal;
