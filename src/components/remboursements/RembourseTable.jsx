import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

function RembourseTable({ remboursements, onEdit, onDelete, loading }) {
  const columns = [
    { name: 'Date', selector: row => row.dateRemboursement, sortable: true },
    { name: 'Pret', selector: row => row.code, sortable: true },
    { name: 'Montant fcfa', selector: row => row.montant, sortable: true },
    { name: 'Membre', selector: row => row.nom_membre, sortable: true },
    { name: 'N° Compte', selector: row => row.numero_compte, sortable: true },
    { name: 'Utilisateur', selector: row => row.nom, sortable: true },
    // {
    //   name: 'Actions',
    //   cell: (row) => (
    //     <>
    //       <Button variant="warning" size="sm" className="me-2" onClick={() => onEdit(row)}>
    //         <FaEdit />
    //       </Button>
    //       <Button variant="danger" size="sm" onClick={() => onDelete(row.id)}>
    //         <FaTrash />
    //       </Button>
    //     </>
    //   )
    // }
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
        paddingBottom: '12px', // tu peux ajuster selon tes besoins
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        paddingTop: '10px',
        paddingBottom: '10px',
        // ou directement : padding: '10px 8px',
      },
    },
  };

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={remboursements}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun remboursement"
        progressPending={loading} // ← booléen indiquant si on charge encore
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default RembourseTable;
