import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/users`; // adapte selon ton serveur
const API_URL2 = `${api_url}/roles`; // adapte selon ton serveur

export const getUsers = () => axios.get(API_URL);
export const getRoles = () => axios.get(API_URL2);
export const createUser = (data) => axios.post(API_URL, data);
export const updateUser = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);

