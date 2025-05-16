import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function CotisationModal({ show, handleClose, handleChange, handleSubmit, form, editCotisation, handleQuit}) {    
    return (
        <Modal show={show} onHide={handleClose} style={{ marginLeft: '120px', marginTop: '70px', paddingBottom: '50px' }}>
            <Modal.Header closeButton>
                <Modal.Title>Enregistrer une cotisation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="date_cotisation" value={form.date_cotisation} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Code du carnet</Form.Label>
                        <Form.Control type="text" name="carnet" value={form.carnet} onChange={handleChange} onBlur={handleQuit}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom du membre</Form.Label>
                        <Form.Control type="text" name="membre" value={form.membre} onChange={handleChange} disabled={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mise</Form.Label>
                        <Form.Control type="number" name="mise" value={form.mise} onChange={handleChange} disabled={!editCotisation}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre de mise</Form.Label>
                        <Form.Control type="number" name="nbre_mise" value={form.nbre_mise} onChange={handleChange} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Enregistrer
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default CotisationModal;
