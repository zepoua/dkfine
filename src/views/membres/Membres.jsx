import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import MembreTable from '../../components/membres/MembreTable';
import MembreModal from '../../components/membres/MembreModal';
import { getMembres, createMembre, updateMembre, deleteMembre } from '../../services/MembreService';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { useUser } from '../../contexts/UserContext';

function Membres() {
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editingMembre, setEditingMembre] = useState(null);
  const { user } = useUser();
  const [form, setForm] = useState({
    nom: '', prenom: '', adresse: '', telephone: '', piece_identite: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [membreToDelete, setMembreToDelete] = useState(null);

  const fetchMembres = async () => {
    try {
      const res = await getMembres();
      setMembres(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement des membres');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  const handleShow = (membre = null) => {
    if (membre) {
      setForm({ ...membre });
      setEditingMembre(membre.id);
    } else {
      setForm({ nom: '', prenom: '', adresse: '', telephone: '', piece_identite: '', user_id: user.id });
      setEditingMembre(null);
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
      if (editingMembre) {
        await updateMembre(editingMembre, form);
        successToast('Membre modifié');
      } else {
        await createMembre(form);
        successToast('Membre créé');
      }
      fetchMembres();
      handleClose();
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors de l\'enregistrement du membre');
    }
  };

  const confirmDelete = (id) => {
    setMembreToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteMembre(membreToDelete);
      successToast('Membre supprimé');
      fetchMembres();
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors de la suppression du membre');
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="flex justify-between items-center">
          <span style={{ marginRight: 100 }}>Gestion des membres</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <MembreTable membres={membres} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
      </div>
      <MembreModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editingMembre={editingMembre} />
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );
}

export default Membres;
