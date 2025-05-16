import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AnnulerDossierModal = ({ show, ModalClose, handleConfirm, form, setForm }) => {
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <Modal show={show} onHide={ModalClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation d'annulation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Voulez-vous vraiment annuler ce dossier de prêt ?</p>
                <Form onSubmit={handleConfirm}>
                    <Form.Group className="mb-3">
                        <Form.Label>Motif d'annulation</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="motif"
                            value={form.motif}
                            onChange={handleChange}
                            placeholder="Indiquez le motif"
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ModalClose}>
                    Fermer
                </Button>
                <Button variant="danger" onClick={handleConfirm} disabled={!form.motif.trim()}>
                    Annuler le dossier
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AnnulerDossierModal;
