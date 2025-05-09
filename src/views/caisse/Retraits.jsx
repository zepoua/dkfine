import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import {getCarnets } from '../../services/CotisationService';
import { useUser } from '../../contexts/UserContext';
import { getRetraits, createRetrait, deleteRetrait, getCycles, updateRetrait } from '../../services/RetraitService';
import RetraitTable from '../../components/retraits/RetraitTable';
import RetraitModal from '../../components/retraits/RetraitModal';

function Retraits() {
  const [retraits, setRetraits] = useState([]);
  const [carnets, setCarnets] = useState([]);
  const [cycles, setCycles] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editRetrait, setEditRetrait] = useState(null);
  const [form, setForm] = useState({
    date: '', membre_id: '', carnet_id: '', cycle_id: '', montant_cotise: '', montant_retire: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [retraitDelete, setRetraitDelete] = useState(null);

  const fetchRetraits = async () => {
    try {
      const res = await getRetraits();
      setRetraits(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRetraits();
  }, []);

  const handleShow = (retrait = null) => {
    if (retrait) {
      setForm({ ...retrait,});
      setEditRetrait(retrait.id);
    } else {
      setForm({ date: new Date().toISOString().split('T')[0], membre_id: '', carnet_id: '', cycle_id: '', montant_cotise: '', montant_retire: '', user_id: user.id });
      setEditRetrait(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const closeConfirm = () => setShowConfirm(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  
    if (name === 'membre_id') {
      try {
        const res = await getCarnets(value); // Attendre la réponse
        setCarnets(res.data);               // Puis mettre à jour les carnets
      } catch (error) {
        console.error("Erreur lors de la récupération des carnets :", error);
      }
    }
    if (name === 'carnet_id') {
      try {
        const res = await getCycles(value); // Attendre la réponse
        setCycles(res.data);               // Puis mettre à jour les carnets
      } catch (error) {
        console.error("Erreur lors de la récupération des cycles :", error);
      }
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRetrait) {
        await updateRetrait(editRetrait, form);
        successToast('Retrait modifie');
      } else {
        await createRetrait(form);
        successToast('Retrait enregistre');        
      }
      fetchRetraits();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    }
  };

  const confirmDelete = (id) => {
    setRetraitDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteRetrait(retraitDelete);
      successToast('Retrait supprimé');
      fetchRetraits();
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors de la suppression');
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="flex justify-between items-center">
          <span style={{ marginRight: 100 }}>Gestion des retraits</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <RetraitTable retraits={retraits} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <RetraitModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editRetrait={editRetrait} membres={membres} carnets={carnets} cycles={cycles}/>
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Retraits;
