import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function MembreTable({ membres, onEdit, onDelete, loading }) {
  const columns = [
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Prénom', selector: row => row.prenom, sortable: true },
    { name: 'Date naissance', selector: row => row.date_naissance, sortable: true },
    { name: 'Téléphone', selector: row => row.telephone, sortable: true },
    { name: 'Adresse', selector: row => row.adresse, sortable: true },
    { name: 'Pièce identité', selector: row => row.piece_identite, sortable: true },
    { name: 'Utilisateur', selector: row => row.user.nom, sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <>
          <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(row)}>
            <FaEdit />
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(row.id)}>
            <FaTrash />
          </Button>
        </>
      )
    }
  ];

  const customStyles = {
    table: {
      style: {
        width: '100%',
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
        data={membres}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun membre trouvé"
        progressPending={loading}
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default MembreTable;
