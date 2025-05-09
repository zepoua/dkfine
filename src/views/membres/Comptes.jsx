import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CompteTable from '../../components/comptes/CompteTable';
import CompteModal from '../../components/comptes/CompteModal';
import { getComptes, createCompte, updateCompte, deleteCompte } from '../../services/CompteService';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { useUser } from '../../contexts/UserContext';

function Comptes() {
  const [comptes, setComptes] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editingCompte, setEditingCompte] = useState(null);
  const [form, setForm] = useState({
    numero_compte: '',
    type_compte: '',
    solde: '',
    part_social: '',
    part_minimal: '',
    membre_id: '',
    user_id: null,
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [compteToDelete, setCompteToDelete] = useState(null);

  const fetchComptes = async () => {
    try {
      const res = await getComptes();
      setComptes(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement des comptes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComptes();
  }, []);

  const handleShow = (compte = null) => {
    if (compte) {
      setForm({
        ...compte,
        membre_id: compte.membre_id || '',
      });
      setEditingCompte(compte.id);
    } else {
      setForm({
        numero_compte: '',
        type_compte: '',
        solde: '',
        part_social: '',
        part_minimal: '',
        membre_id: '',
        user_id: user.id,
      });
      setEditingCompte(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const closeConfirm = () => setShowConfirm(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!form.membre_id) {
        errorToast('Veuillez sélectionner un membre.');
        return;
      }

      if (editingCompte) {
        await updateCompte(editingCompte, form);
        successToast('Compte modifié avec succès');
      } else {
        await createCompte(form);
        successToast('Compte créé avec succès');
      }
      fetchComptes();
      handleClose();
    } catch (err) {
      console.error(err);
      errorToast(err.response.data.message);
      console.log(err);
      
    }
  };

  const confirmDelete = (id) => {
    setCompteToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCompte(compteToDelete);
      successToast('Compte supprimé avec succès');
      fetchComptes();
    } catch (err) {
      console.error(err);
      errorToast("Erreur lors de la suppression du compte");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="flex justify-between items-center">
          <span style={{ marginRight: 100 }}>Gestion des comptes</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <CompteTable
          comptes={comptes}
          onEdit={handleShow}
          onDelete={confirmDelete}
          loading={loading}
        />
      </div>
      
      <CompteModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        editingCompte={editingCompte}
        membres={membres}
      />

      <ConfirmDeleteModal
        show={showConfirm}
        ModalClose={closeConfirm}
        handleConfirm={handleDelete}
      />

      <ToastContainer />
    </MainCard>
  );
}

export default Comptes;
