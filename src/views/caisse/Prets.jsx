import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { createPret, deletePret, getPrets, updatePret } from '../../services/PretService';
import { useUser } from '../../contexts/UserContext';
import PretTable from '../../components/prets/PretTable';
import PretModal from '../../components/prets/PretModal';
import { getComptes } from '../../services/TransactionService';

function Prets() {
  const [prets, setPrets] = useState([]);
  const [comptes, setComptes] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editPret, setEditPret] = useState(null);
  const [form, setForm] = useState({
    date_debut: '', membre_id: '', compte_id: '', type_taux:'', taux:'', frais_dossier:'', montant: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [pretDelete, setPretDelete] = useState(null);

  const fetchPrets = async () => {
    try {
      const res = await getPrets();
      setPrets(res.data);
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

  const handleShow = (transaction = null) => {
    if (transaction) {
      setForm({ ...transaction });
      setEditPret(transaction.id);
    } else {
      setForm({ date_debut: new Date().toISOString().split('T')[0], membre_id: '', compte_id: '', type_taux:'', taux:'', frais_dossier:'', montant: '', user_id: user.id });
      setEditPret(null);
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
        const res = await getComptes(value); // Attendre la réponse
        setComptes(res.data);               // Puis mettre à jour les comptes
      } catch (error) {
        console.error("Erreur lors de la récupération des comptes :", error);
      }
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPret) {
        await updatePret(editPret, form);
        successToast('Pret modifie');
      } else {
        await createPret(form);
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
      await deletePret(pretDelete);
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
        <div className="flex justify-between items-center">
          <span style={{ marginRight: 100 }}>Gestion des prets</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <PretTable prets={prets} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <PretModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editPret={editPret} membres={membres} comptes={comptes} />
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Prets;
