import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Spinner, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import RecuPDF from './RecuPDF';

function CompteTable({ comptes, onEdit, onDelete, loading, microfinance }) {
  const [showRecuModal, setShowRecuModal] = useState(false);
  const [selectedCompte, setSelectedCompte] = useState(null);

  const handleViewRecu = (compte) => {
    setSelectedCompte(compte);
    setShowRecuModal(true);
  };

  const handleCloseRecuModal = () => {
    setShowRecuModal(false);
    setSelectedCompte(null);
  };

  const columns = [
    { name: 'N° Compte', selector: row => row.numero_compte, sortable: true },
    { name: 'Type', selector: row => row.type_compte, sortable: true },
    { name: 'Solde', selector: row => row.solde, sortable: true },
    { name: 'Utilisateur', selector: row => row.user?.nom || '—', sortable: true },
    { name: 'Membre', selector: row => row.membre?.nom || '—', sortable: true },
    { name: 'État', selector: row => row.etat || '—', sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(row)}>
            <FaEdit />
          </Button>
          {/* <Button variant="danger" size="sm" className="me-2" onClick={() => onDelete(row.id)}>
            <FaTrash />
          </Button> */}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleViewRecu(row)}
            title="Voir le reçu PDF"
          >
            <FaFilePdf />
          </Button>
        </>
      ),
    },
  ];

  const customStyles = {
    tableWrapper: {
      style: {
        width: '100%',
        overflowX: 'auto',
      },
    },
    table: {
      style: {
        minWidth: '1200px',
      },
    },
    headCells: {
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingTop: '10px',
        paddingBottom: '10px',
      },
    },
  };

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={comptes}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun compte trouvé"
        progressPending={loading}
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />

      <Modal show={showRecuModal} onHide={handleCloseRecuModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Reçu du Compte</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '600px' }}>
          {selectedCompte ? (
            <>
              <PDFViewer width="100%" height="100%">
                <RecuPDF compte={selectedCompte} microfinance={microfinance}/>
              </PDFViewer>
              <div className="mt-3 text-center">
                <PDFDownloadLink
                  document={<RecuPDF compte={selectedCompte} microfinance={microfinance}/>}
                  fileName={`Recu_Compte_${selectedCompte.numero_compte}.pdf`}
                  className="btn btn-primary"
                >
                  {({ loading }) => (loading ? 'Préparation du PDF...' : 'Télécharger le Reçu')}
                </PDFDownloadLink>
              </div>
            </>
          ) : (
            <p>Aucune donnée disponible</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRecuModal}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CompteTable;
