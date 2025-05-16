import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import CotisationTable from '../../components/cotisations/CotisationTable';
import { createCotisation, deleteCotisation, getCotisations, updateCotisation } from '../../services/CotisationService';
import { useUser } from '../../contexts/UserContext';
import CotisationModal from '../../components/cotisations/CotisationModal';
import { api_url } from '../../services/config';
import axios from 'axios';

function Cotisations() {
  const [cotisations, SetCotisations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editCotisation, setEditCotisation] = useState(false);
  const [form, setForm] = useState({
    date_cotisation: '', carnet_id: null, carnet: '', membre: '', mise: '', nbre_mise: '', user_id: null
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
    setForm({ date_cotisation: new Date().toISOString().split('T')[0], carnet_id: null, carnet: '', membre: '', mise: '', nbre_mise: '', user_id: user.id });
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const closeConfirm = () => setShowConfirm(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleQuit = async (e) => {
    const { name, value } = e.target;
    try {
      if (value !== '') {
        const res = await axios.get(`${api_url}/find_carnet/${value}`);
        setForm((prevForm) => ({
          ...prevForm,
          carnet_id: res.data.data.id,
          membre: res.data.data.membre_nom,
          mise: res.data.data.mise,
        }));
        if (res.data.data.etat !== 'Encours') {
          setEditCotisation(true);
        }
        successToast(res.data.status);
      }
    } catch (error) {
      setForm((prevForm) => ({
        ...prevForm,
        carnet_id: null,
        membre: '',
        mise: '',
      }));
      setEditCotisation(false);
      console.log(error);
      errorToast(error.response.data.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCotisation(form);
      successToast('Cotisation enregistree');
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
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="fw-bold fs-5">Gestion des cotisations</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="me-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <CotisationTable cotisations={cotisations} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <CotisationModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editCotisation={editCotisation} handleQuit={handleQuit} />
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Cotisations;
