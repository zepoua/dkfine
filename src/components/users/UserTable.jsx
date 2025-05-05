import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

function UserTable({ users, onEdit, onDelete, loading }) {
  const columns = [
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Adresse', selector: row => row.adresse, sortable: true },
    { name: 'Téléphone', selector: row => row.telephone, sortable: true },
    { name: 'Role', selector: row => row.role.libelle, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    { name: 'Carnet', selector: row => row.qte_carnet, sortable: true },
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
        data={users}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun utilisateur trouvé"
        progressPending={loading} // ← booléen indiquant si on charge encore
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default UserTable;
