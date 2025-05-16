import React from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Spinner } from 'react-bootstrap';

function DossierTable({ dossiers, onEdit, onDelete, loading }) {
  const columns = [
    { name: 'Date', selector: row => row.date_ouverture, sortable: true },
    { name: 'Code', selector: row => row.code, sortable: true },
    { name: 'Membre', selector: row => row.compte.membre.nom, sortable: true },
    { name: 'N° Compte', selector: row => row.compte.numero_compte, sortable: true },
    { name: 'Cout fcfa', selector: row => row.cout, sortable: true },
    { name: 'Utilisateur', selector: row => row.user.nom, sortable: true },
    {
      name: 'État',
      sortable: true,
      cell: (row) => {
        let color = '';
        switch (row.etat?.toLowerCase()) {
          case 'encours':
            color = 'orange';
            break;
          case 'annuler':
            color = 'red';
            break;
          case 'valider':
            color = 'green';
            break;
          default:
            color = 'black';
        }
        return <span style={{ color, fontWeight: 'bold', textTransform: 'capitalize' }}>{row.etat}</span>;
      }
    },
    { name: 'Motif', selector: row => row.motif, sortable: true },
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
        data={dossiers}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun dossier de pret"
        progressPending={loading} // ← booléen indiquant si on charge encore
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default DossierTable;
