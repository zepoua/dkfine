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
  const { user, fetchMembres } = useUser();
  const [form, setForm] = useState({
    nom: '', prenom: '', adresse: '', date_naissance: '', telephone: '', piece_identite: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [membreToDelete, setMembreToDelete] = useState(null);

  const fetchMembre = async () => {
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
    fetchMembre();
  }, []);

  const handleShow = (membre = null) => {
    if (membre) {
      setForm({ ...membre });
      setEditingMembre(membre.id);
    } else {
      setForm({ nom: '', prenom: '', date_naissance: new Date().toISOString().split('T')[0], adresse: '', telephone: '', piece_identite: '', user_id: user.id });
      setEditingMembre(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const closeConfirm = () => setShowConfirm(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      if (editingMembre) {
        await updateMembre(editingMembre, formData); // API doit accepter FormData
        successToast('Membre modifié');
      } else {
        await createMembre(formData); // API doit accepter FormData
        successToast('Membre créé');
      }
      fetchMembres();
      fetchMembre();
      handleClose();
    } catch (err) {
      console.error(err);
      errorToast(err.response?.data?.message || 'Erreur inconnue');
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
      fetchMembre();
    } catch (err) {
      console.error(err);
      errorToast(err.response?.data?.message || 'Erreur inattendue');
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="fw-bold fs-5">Gestion des membres</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="me-2" /> Nouveau
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
