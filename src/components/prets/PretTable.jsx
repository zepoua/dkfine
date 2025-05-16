import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Spinner } from 'react-bootstrap';
import { FaInfo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PretTable({ prets, loading }) {
  const navigate = useNavigate();

  const handleInfoClick = (row) => {
    navigate(`/pret/${row.id}/situation`);
  };

  const columns = [
    { name: 'Date debut', selector: row => row.date_debut, sortable: true },
    { name: 'Dossier', selector: row => row.dossier.code, sortable: true },
    { name: 'Taux %', selector: row => row.taux, sortable: true },
    { name: 'Montant fcfa', selector: row => row.montant, sortable: true },
    { name: 'A Rembourse fcfa', selector: row => row.montant_rembourse, sortable: true },
    { name: 'Membre', selector: row => row.compte.membre.nom, sortable: true },
    { name: 'Utilisateur', selector: row => row.user.nom, sortable: true },
    {
      name: 'État',
      sortable: true,
      cell: (row) => {
        let color = '';
        switch ((row.etat || '').toLowerCase()) {
          case 'encours':
            color = 'orange';
            break;
          case 'valider':
            color = 'green';
            break;
          case 'rembourser':
            color = 'blue';
            break;
          default:
            color = 'black';
        }
        return <span style={{ color, fontWeight: 'bold', textTransform: 'capitalize' }}>{row.etat}</span>;
      }
    },    
    {
      name: 'Détails',
      cell: (row) => (
        <Button variant="primary" size="sm" className="me-2" onClick={() => handleInfoClick(row)}>
          <FaInfo />
        </Button>
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
        data={prets}
        pagination
        highlightOnHover
        pointerOnHover
        dense
        striped
        noDataComponent="Aucun prêt en cours"
        progressPending={loading}
        progressComponent={<Spinner animation="border" variant="primary" />}
        customStyles={customStyles}
      />
    </div>
  );
}

export default PretTable;
