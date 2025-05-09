import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';
import { createTransaction, deleteTransaction, getComptes, getTransactions, updateTransaction } from '../../services/TransactionService';
import { useUser } from '../../contexts/UserContext';
import TransactionTable from '../../components/transactions/TransactionTable';
import TransactionModal from '../../components/transactions/TransactionModal';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [comptes, setComptes] = useState([]);
  const { membres, user } = useUser();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [form, setForm] = useState({
    date: '', membre_id: '', compte_id: '', type_transaction:'' ,montant: '', user_id: null
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [transactionDelete, setTransactionDelete] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleShow = (transaction = null) => {
    if (transaction) {
      setForm({ ...transaction });
      setEditTransaction(transaction.id);
    } else {
      setForm({ date: new Date().toISOString().split('T')[0], membre_id: '', compte_id: '', type_transaction:'' ,montant: '', user_id: user.id });
      setEditTransaction(null);
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
      if (editTransaction) {
        await updateTransaction(editTransaction, form);
        successToast('Transaction modifiee');
      } else {
        await createTransaction(form);
        successToast('Transaction enregistree');        
      }
      fetchTransactions();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    }
  };

  const confirmDelete = (id) => {
    setTransactionDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactionDelete);
      successToast('Transaction supprimée');
      fetchTransactions();
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
          <span style={{ marginRight: 100 }}>Gestion des transactions</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="mr-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <TransactionTable transactions={transactions} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
        <TransactionModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editTransaction={editTransaction} membres={membres} comptes={comptes} />
      </div>
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Transactions;
