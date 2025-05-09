import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Spinner } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function CompteTable({ comptes, onEdit, onDelete, loading }) {
  const columns = [
    { name: 'N° Compte', selector: row => row.numero_compte, sortable: true },
    { name: 'Type', selector: row => row.type_compte, sortable: true },
    { name: 'Solde', selector: row => row.solde, sortable: true },
    { name: 'Part Sociale', selector: row => row.part_social, sortable: true },
    { name: 'Part Minimale', selector: row => row.part_minimal, sortable: true },
    { name: 'Membre', selector: row => row.membre?.nom || '—', sortable: true },
    { name: 'Utilisateur', selector: row => row.user?.nom || '—', sortable: true },
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
    table: { style: { width: '100%' } },
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
    </div>
  );
}

export default CompteTable;
