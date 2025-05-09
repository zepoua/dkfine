import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import CarnetTable from '../../components/carnets/CarnetTable';
import CarnetModal from '../../components/carnets/CarnetModal';
import { getCarnets, createCarnet, updateCarnet, deleteCarnet } from '../../services/CarnetService';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { useUser } from '../../contexts/UserContext';

function Carnets() {
  const [carnets, setCarnets] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editingCarnet, setEditingCarnet] = useState(null);
  const [form, setForm] = useState({
    code: '',
    user_id: null,
    membre_id: '',
    date: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [carnetToDelete, setCarnetToDelete] = useState(null);

  const fetchCarnets = async () => {
    try {
      const res = await getCarnets();
      setCarnets(res.data);
    } catch (err) {
      errorToast(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarnets();
  }, []);

  const handleShow = (carnet = null) => {
    if (carnet) {
      // On ne garde que les champs utiles pour le formulaire
      setForm({
        id: carnet.id,
        code: carnet.code || '',
        date: carnet.date || '',
        membre_id: carnet.membre_id || '',
        user_id: carnet.user_id || '1'
      });
      setEditingCarnet(carnet.id);
    } else {
      setForm({ code: '', membre_id: '', date: new Date().toISOString().split('T')[0], user_id: user.id });
      setEditingCarnet(null);
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

    // On extrait uniquement les champs nécessaires
    const dataToSend = {
      code: form.code,
      membre_id: form.membre_id,
      date: form.date,
      user_id: form.user_id
    };

    try {
      if (editingCarnet) {
        await updateCarnet(editingCarnet, dataToSend);
        successToast('Carnet modifié');
      } else {
        await createCarnet(dataToSend);
        successToast('Carnet créé');
      }
      fetchCarnets();
      handleClose();
    } catch (err) {
      errorToast(err.response?.data?.message || "Erreur inconnue");
    }
  };

  const confirmDelete = (id) => {
    setCarnetToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCarnet(carnetToDelete);
      successToast('Carnet supprimé');
      fetchCarnets();
    } catch (err) {
      errorToast(err.response?.data?.message || "Erreur inconnue");
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="flex justify-between items-center">
          <span style={{ marginRight: 100 }}>Gestion des carnets</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <CarnetTable
          carnets={carnets}
          onEdit={handleShow}
          onDelete={confirmDelete}
          loading={loading}
        />
      </div>
      <CarnetModal
        show={show}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        editingCarnet={editingCarnet}
        membres={membres}
      />
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );
}

export default Carnets;
