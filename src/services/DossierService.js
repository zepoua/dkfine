import axios from 'axios';
import { api_url } from './config';

const API_URL = `${api_url}/dossier_prets`; // adapte selon ton serveur

export const getDossiers = () => axios.get(API_URL);
export const createDossier = (data) => axios.post(API_URL, data);
export const updateDossier = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteDossier = (id, data) =>
    axios.delete(`${API_URL}/${id}`, {
        data: data // Ceci place les données dans le corps de la requête
    });

