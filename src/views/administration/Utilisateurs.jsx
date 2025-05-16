import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import UserTable from '../../components/users/UserTable';
import UserModal from '../../components/users/UserModal';
import { getUsers, createUser, updateUser, deleteUser, getRoles } from '../../services/UserService';
import { successToast, errorToast } from '../../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';
import MainCard from 'ui-component/cards/MainCard';
import ConfirmDeleteModal from '../../components/Alert/ConfirmDelete';

function Utilisateurs() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '', adresse: '', telephone: '', role_id: '', email: '', password: ''
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);

      const res1 = await getRoles();
      setRoles(res1.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleShow = (user = null) => {
    if (user) {
      setForm({ ...user, password: '' });
      setEditingUser(user.id);
    } else {
      setForm({ name: '', adresse: '', telephone: '', role_id: '', email: '', password: '' });
      setEditingUser(null);
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
    try {
      if (editingUser) {
        await updateUser(editingUser, form);
        successToast('Utilisateur modifié');
      } else {
        await createUser(form);
        successToast('Utilisateur créé');
      }
      fetchUsers();
      handleClose();
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Une erreur s’est produite.';
      errorToast(message);
    }
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      await deleteUser(userToDelete);
      successToast('Utilisateur supprimé');
      fetchUsers();
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
          <span className="fw-bold fs-5">Gestion des utilisateurs</span>
          <Button variant="primary" onClick={() => handleShow()}>
            <FaPlus className="me-2" /> Nouveau
          </Button>
        </div>
      }
    >
      <div style={{ minWidth: 990 }}>
        <UserTable users={users} onEdit={handleShow} onDelete={confirmDelete} loading={loading} />
      </div>
      <UserModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editingUser={editingUser} roles={roles} />
      <ConfirmDeleteModal show={showConfirm} ModalClose={closeConfirm} handleConfirm={handleDelete} />
      <ToastContainer />
    </MainCard>
  );

}

export default Utilisateurs;
