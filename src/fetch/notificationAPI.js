import axios from 'axios';
import { authHeader } from './authHeader';

export function postNotification (notification) {
    if (!notification.messageTo ||
        !notification.messageFrom ||
        !notification.message) {
        return;
    }
    return axios.post(`/api/notification?${+Date.now()}`, {
        messageTo: notification.messageTo,
        messageFrom: notification.messageFrom,
        message: notification.message,
        link: notification.link
    }, authHeader());
}

export function getNotifications () {
    return axios.get(`/api/notifications?${+Date.now()}`, authHeader());
}

