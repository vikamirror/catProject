import axios from 'axios';
import { authHeader } from './authHeader';

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
}

export function login(email, password) {
    return axios.post(`/api/login?${+Date.now()}`, {
                email: email,
                password: password
           });
}