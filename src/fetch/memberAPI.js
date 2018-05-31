import axios from 'axios';
import { authHeader } from './authHeader';

export function removeFavoritePost (postCuid) {
    return axios.delete(`/api/favoritePost/${postCuid}`, authHeader());
}

export function addFavoritePost (postCuid) {
    return axios.put(`/api/favoritePost`, {postCuid: postCuid}, authHeader());
}

export function getMember() {
    return axios.get(`/api/getMember?${+Date.now()}`, authHeader());
}

export function register(email, password, name) {
    return axios.post(`/api/register?${+Date.now()}`, {
                    email: email,
                    password: password,
                    name: name
                 });
}

export async function loginWithFacebook(authResponse) {
    try {
        const fbInfo = await axios.get('https://graph.facebook.com/me?',{
            params: {
                access_token: authResponse.accessToken,
                fields: 'name, email, picture.type(normal)',
            },
         });
         return axios.post(`/api/loginWithFacebook?${+Date.now()}`, {
            facebookID: fbInfo.data.id,
            name: fbInfo.data.name,
            avatar: fbInfo.data.picture.data.url,
            accessToken: authResponse.accessToken,
        });
    } catch (err) {
        console.log('loginWithFacebook catch err: ', err);
    }
}

export function login(email, password) {
    return axios.post(`/api/login?${+Date.now()}`, {
                email: email,
                password: password
           });
}