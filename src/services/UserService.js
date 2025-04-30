import axios from 'axios';

const API_URL = 'http://192.168.1.82/dkfine/public/api/users'; // adapte selon ton serveur

export const getUsers = () => axios.get(API_URL);
export const createUser = (data) => axios.post(API_URL, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);