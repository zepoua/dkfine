import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { createRemboursement, deleteRemboursement, getDossiers, getRemboursements, updateRemboursement } from '../../services/RemboursementService';
import { useUser } from '../../contexts/UserContext';
import RembourseTable from '../../components/remboursements/RembourseTable';
import RembourseModal from '../../components/remboursements/RembourseModal';

function Remboursements() {
  const [remboursements, setRemboursements] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editRembourse, setEditRembourse] = useState(null);
  const [form, setForm] = useState({
    dateRemboursement: '', dossier_pret_id: '', montant_a_rembourse:'', montant_rembourse:'', montant_restant:'', montnant: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [pretDelete, setPretDelete] = useState(null);

  const fetchPrets = async () => {
    try {
      const res = await getRemboursements();
      setRemboursements(res.data);
      const res1 = await getDossiers();
      setDossiers(res1.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrets();
  }, []);

  const handleShow = (remboursement = null) => {
    if (remboursement) {
      setForm({ ...remboursement });
      setEditRembourse(remboursement.id);
    } else {
      setForm({ dateRemboursement: new Date().toISOString().split('T')[0], dossier_pret_id: '',  montant_a_rembourse: '', montant_rembourse:'', montant_restant:'', montnant: '', user_id: user.id });
      setEditRembourse(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const closeConfirm = () => setShowConfirm(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
    if (name === 'dossier_pret_id') {
      const selectedDossier = dossiers.find((dossier) => dossier.id === parseInt(value));
      if (selectedDossier) {
        setForm((prevForm) => ({
          ...prevForm,
          montant_a_rembourse: selectedDossier.montant_a_rembourse,
          montant_rembourse: selectedDossier.montant_rembourse,
          montant_restant: selectedDossier.montant_restant,
          montant: selectedDossier.montant_restant
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editRembourse) {
        await updateRemboursement(editRembourse, form);
        successToast('Pret modifie');
      } else {
        await createRemboursement(form);
        successToast('Pret enregistree');
      }
      fetchPrets();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    }
  };

  const confirmDelete = (id) => {
    setPretDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteRemboursement(pretDelete);
      successToast('Pret supprimée');
      fetchPrets();
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
          <span className="fw-bold fs-5">Gestion des remboursements</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="me-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <RembourseTable remboursements={remboursements} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <RembourseModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editRembourse={editRembourse} dossiers={dossiers} />
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Remboursements;
