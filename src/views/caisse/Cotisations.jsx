import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import CotisationTable from '../../components/cotisations/CotisationTable';
import { createCotisation, deleteCotisation, getCarnets, getCotisations, updateCotisation } from '../../services/CotisationService';
import { useUser } from '../../contexts/UserContext';
import CotisationModal from '../../components/cotisations/CotisationModal';

function Cotisations() {
  const [cotisations, SetCotisations] = useState([]);
  const [carnets, setCarnets] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editCotisation, setEditCotisation] = useState(null);
  const [form, setForm] = useState({
    date_cotisation: '', membre_id: '', carnet_id: '', montant: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [cotisationDelete, setCotisationDelete] = useState(null);

  const fetchCotisations = async () => {
    try {
      const res = await getCotisations();
      SetCotisations(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCotisations();
  }, []);

  const handleShow = (cotisation = null) => {
    if (cotisation) {
      setForm({ ...cotisation, password: '' });
      setEditCotisation(cotisation.id);
    } else {
      setForm({ date_cotisation: new Date().toISOString().split('T')[0], membre_id: '', carnet_id: '', montant: '', user_id: user.id });
      setEditCotisation(null);
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
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editCotisation) {
        await updateCotisation(editCotisation, form);
        successToast('Cotisation modifiee');
      } else {
        await createCotisation(form);
        successToast('Cotisation enregistree');        
      }
      fetchCotisations();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    }
  };

  const confirmDelete = (id) => {
    setCotisationDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCotisation(cotisationDelete);
      successToast('Cotisation supprimée');
      fetchCotisations();
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
          <span style={{ marginRight: 100 }}>Gestion des cotisations</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <CotisationTable cotisations={cotisations} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <CotisationModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editCotisation={editCotisation} membres={membres} carnets={carnets} />
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Cotisations;
