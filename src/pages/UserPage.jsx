import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import UserTable from '../components/users/UserTable';
import UserModal from '../components/users/UserModal';
import { getUsers, createUser, updateUser, deleteUser } from '../services/UserService';
import { successToast, errorToast } from '../outils/ToastConfig';
import { ToastContainer } from 'react-toastify';

function UserPage() {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    name: '', adresse: '', telephone: '', role_id: '', email: '', password: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      errorToast('Erreur lors du chargement');
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
      errorToast('Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      try {
        await deleteUser(id);
        successToast('Utilisateur supprimé');
        fetchUsers();
      } catch (err) {
        console.error(err);
        errorToast('Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="p-4 w-full">
      <h2 className="mb-4">Gestion des utilisateurs</h2>
      <Button variant="primary" className="mb-3" onClick={() => handleShow()}>
        <FaPlus /> Nouveau
      </Button>

      <UserTable users={users} onEdit={handleShow} onDelete={handleDelete} />
      <UserModal show={show} handleClose={handleClose} handleChange={handleChange} handleSubmit={handleSubmit} form={form} editingUser={editingUser} />
      <ToastContainer />
    </div>
  );
}

export default UserPage;
