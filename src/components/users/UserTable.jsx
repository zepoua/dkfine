import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

function UserTable({ users, onEdit, onDelete }) {
  const columns = [
    { name: 'Nom', selector: row => row.nom, sortable: true },
    { name: 'Adresse', selector: row => row.adresse, sortable: true },
    { name: 'Téléphone', selector: row => row.telephone, sortable: true },
    { name: 'Role ID', selector: row => row.role_id, sortable: true },
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

  return (
    <div className="p-4 w-full">
        <DataTable
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            pointerOnHover
            dense
            striped
            noDataComponent="Aucun utilisateur trouvé"
            className="p-4 w-full"
        
        />
    </div>    
  );
}

export default UserTable;
