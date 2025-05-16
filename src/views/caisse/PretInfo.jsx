import { Card, Table, Button, Row, Col, Badge, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_url } from '../../services/config';
import { errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';

const PretInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPret = async () => {
    try {
      const res = await axios.get(`${api_url}/prets/${id}`); // adapte l'URL
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      errorToast(err.response.data.message || 'Erreur lors du chargement des données');
      alert('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPret();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!data) return <p>Aucune donnée</p>;

  return (
    <>
      <style>{`
        @media print {
            body * {
                visibility: hidden;
            }
            .pret-print, .pret-print * {
                visibility: visible;
            }
            .pret-print {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 20px;
            }
            .no-print {
                display: none !important;
            }
        }
    `}</style>
      <div className="pret-print my-4 p-4 border rounded shadow-sm bg-white">
        <Card className="shadow-lg">
          <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Situation du Prêt</h5>
            <Badge bg={data.etat_pret === 'valider' ? 'success' : data.etat_pret === 'annuler' ? 'danger' : 'warning'}>
              {data.etat_pret.toUpperCase()}
            </Badge>
          </Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}><strong>Nom:</strong> {data.nom} {data.prenom}</Col>
              <Col md={4}><strong>Compte:</strong> {data.compte}</Col>
              <Col md={4}><strong>N° Dossier:</strong> {data.code}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Date du prêt:</strong> {data.date_pret}</Col>
              <Col md={4}><strong>Début:</strong> {data.date_debut}</Col>
              <Col md={4}><strong>Fin:</strong> {data.date_fin}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Montant total:</strong> {data.montant_total.toLocaleString()} FCFA</Col>
              <Col md={4}><strong>Type taux:</strong> {data.type_taux} </Col>
              <Col md={4}><strong>Taux:</strong> {data.taux} %</Col>
            </Row>
            <Row className="mb-4">
              <Col md={4}><strong>À rembourser:</strong> {data.total_a_rembourse.toLocaleString()} FCFA</Col>
              <Col md={4}><strong>Remboursé:</strong> {data.montant_rembourse.toLocaleString()} FCFA</Col>
              <Col md={4}><strong>Capital restant:</strong> <span className="text-danger fw-bold">{data.capital_restant.toLocaleString()} FCFA</span></Col>
            </Row>

            <h5 className="mb-3">Tableau d'Amortissement</h5>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mois</th>
                  <th>Montant</th>
                  <th>Payé</th>
                  <th>État</th>
                </tr>
              </thead>
              <tbody>
                {data.ammortissements.map((a, index) => (
                  <tr key={a.id}>
                    <td>{index + 1}</td>
                    <td>{a.mois}</td>
                    <td>{a.montant.toLocaleString()} FCFA</td>
                    <td>{a.montant_paye.toLocaleString()} FCFA</td>
                    <td>
                      <Badge bg={a.etat === 'payé' ? 'success' : 'secondary'}>
                        {a.etat.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="text-start">
            <Button variant="secondary" className="me-2" onClick={() => navigate(-1)}>Quitter</Button>
            <Button variant="primary" onClick={handlePrint}>Imprimer</Button>
          </Card.Footer>
        </Card>
        <ToastContainer />
      </div>
    </>

  );
};

export default PretInfo;
