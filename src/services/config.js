import axios from 'axios';

export const api_url = 'http://127.0.0.1:8000/api'; // adapte selon ton serveur

export const getCsrfCookie = async () => {
    return axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
    });
};