import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import { createDossier, deleteDossier, getDossiers, updateDossier } from '../../services/DossierService';
import { useUser } from '../../contexts/UserContext';
import { getComptes } from '../../services/TransactionService';
import DossierTable from '../../components/dossiers/DossierTable';
import DossierModal from '../../components/dossiers/DossierModal';
import AnnulerDossierModal from '../../components/Alert/AnnulerDossier';
import DossierValModal from '../../components/dossiers/DossierValider';

function DossierPrets() {
  const [dossiers, setDossiers] = useState([]);
  const [comptes, setComptes] = useState([]);
  const { membres, user, microfinance } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showPret, setShowPret] = useState(false);
  const [editDossier, setEditDossier] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [dossierDelete, setDossierDelete] = useState(null);
  const [form, setForm] = useState({
    date_ouverture: '', membre_id: '', compte_id: '', montant: '', cout: '', user_id: null
  });
  const [annulerform, setAnnulerForm] = useState({
    motif: '', user_id: null
  });
  const [pretForm, setPretForm] = useState({
    dossier: '', date_debut: '', date_pret: '', dossier_pret_id: '', mois: '', user_id: null
  });

  const fetchDossiers = async () => {
    try {
      const res = await getDossiers();
      setDossiers(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDossiers();
  }, []);

  const handleShow = (dossier = null) => {
    if (dossier) {
      setEditDossier(dossier.id);
      setPretForm({ dossier: dossier.code, date_debut: new Date().toISOString().split('T')[0], date_pret: new Date().toISOString().split('T')[0], dossier_pret_id: dossier.id, mois: '', user_id: user.id });
      setShowPret(true);
    } else {
      setForm({ date_ouverture: new Date().toISOString().split('T')[0], membre_id: '', compte_id: '', montant: '', cout: '', user_id: user.id });
      setShow(true);
    }
  };

  const handleClose = () => { setShow(false); setShowPret(false); };

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
    if (name === 'montant') {
      const montant = parseFloat(value);

      if (!isNaN(montant) && microfinance) {
        const { pret_achat, pret_etude, pret_assurance } = microfinance;

        const cout = Math.ceil(
          (montant * pret_achat) / 100 +
          (montant * pret_etude) / 100 +
          (montant * pret_assurance) / 100
        );

        setForm((prevForm) => ({ ...prevForm, cout }));
      }
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDossier) {
        await updateDossier(editDossier, pretForm);
        successToast('Dossier Valide');
      } else {
        await createDossier(form);
        successToast('Dossier enregistree');
      }
      fetchDossiers();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    } finally {
      setShowPret(false);
    }
  };

  const confirmDelete = (id) => {
    setDossierDelete(id);
    setShowConfirm(true);
    setAnnulerForm({ ...annulerform, user_id: user.id });
  };

  const handleDelete = async () => {
    if (annulerform.motif === '') {
      errorToast('Veuillez entrer un motif d\'annulation');
      return;
    }
    try {
      await deleteDossier(dossierDelete, annulerform);
      successToast('Dossier Annule');
      fetchDossiers();
    } catch (err) {
      console.error(err);
      errorToast(err.response.data.message);
    } finally {
      setShowConfirm(false);
      setAnnulerForm({ motif: '', user_id: null });
    }
  };

  return (
    <MainCard
      style={{ width: '100%', overflowX: 'auto' }}
      title={
        <div className="d-flex justify-content-between align-items-center w-100">
          <span className="fw-bold fs-5">Gestion des dossiers de pret</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="me-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <DossierTable dossiers={dossiers} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <DossierModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} membres={membres} comptes={comptes} />
      </div>
      <AnnulerDossierModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} form={annulerform} setForm={setAnnulerForm} />
      <DossierValModal show={showPret} handleClose={handleClose} handleSubmit={handleSubmit} form={pretForm} setForm={setPretForm} />
      <ToastContainer />
    </MainCard>
  );

}

export default DossierPrets;
