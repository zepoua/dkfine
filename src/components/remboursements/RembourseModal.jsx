import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function RembourseModal({ show, handleClose, handleChange, handleSubmit, form, editRembourse, dossiers }) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>{editRembourse ? 'Modifier un Remboursement' : 'Enregistrer un Remboursement'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date de payement</Form.Label>
                        <Form.Control type="date" name="dateRemboursement" value={form.dateRemboursement} onChange={handleChange} required />
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
                        <Form.Label>Montant total a rembourse</Form.Label>
                        <Form.Control type="number" name="montant_a_rembourse" value={form.montant_a_rembourse} onChange={handleChange} disabled={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant total a rembourse</Form.Label>
                        <Form.Control type="number" name="montant_rembourse" value={form.montant_rembourse} onChange={handleChange} disabled={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant restant</Form.Label>
                        <Form.Control type="number" name="montant_restant" value={form.montant_restant} onChange={handleChange} disabled={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Montant rembourse</Form.Label>
                        <Form.Control type="number" name="montant" value={form.montant} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {editRembourse ? 'Modifier' : 'Enregistrer'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default RembourseModal;
