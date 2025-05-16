import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import { createPret, deletePret, getDossiers, getPrets, updatePret } from '../../services/PretService';
import { useUser } from '../../contexts/UserContext';
import PretTable from '../../components/prets/PretTable';
import PretModal from '../../components/prets/PretModal';

function Prets() {
  const [prets, setPrets] = useState([]);
  const [dossiers, setDossiers] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editPret, setEditPret] = useState(null);
  const [form, setForm] = useState({
    date_debut: '', date_pret: '', dossier_pret_id: '', mois: '', user_id: null
  });

  const fetchPrets = async () => {
    try {
      const res = await getPrets();
      setPrets(res.data);
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

  const handleShow = (pret = null) => {
    if (pret) {
      setForm({ ...pret });
      setEditPret(pret.id);
    } else {
      setForm({ date_debut: new Date().toISOString().split('T')[0], date_pret: new Date().toISOString().split('T')[0], dossier_pret_id: '', mois: '', user_id: user.id });
      setEditPret(null);
    }
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
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

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="fw-bold fs-5">Gestion des prêts</span>
          <Button variant="primary" onClick={()=>handleShow()}>
            <FaPlus className="me-2" /> Simulation de pret
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <PretTable prets={prets} loading={loading} />
        <PretModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} dossiers={dossiers} />
      </div>
      <ToastContainer />
    </MainCard>
  );

}

export default Prets;
