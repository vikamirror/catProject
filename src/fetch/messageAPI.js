import axios from 'axios';
import { authHeader } from './authHeader';

export function postMessage (message) {
    return axios.post(`/api/message?${+Date.now()}`, message, authHeader());
}

export function getMessages (postCuid) {
    return axios.get(`/api/messages/${postCuid}?${+Date.now()}`);
}