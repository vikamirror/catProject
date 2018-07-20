import axios from 'axios';
import { errorLog } from '../Utils/console';

const imgurAuthHeader = {
    headers: {
        "Content-type": "application/json",
        "Authorization": "Client-ID c4a383c279d5897"
    }
};

const readFileAsText = (file) => {
    const FR = new FileReader();
    return new Promise((resolve, reject) => {
        FR.onerror = () => {
            FR.abort();
            reject(new DOMException("fileReader解析成字串時出現錯誤"));
        };
        FR.onload = (readerEvent) => {
            resolve(readerEvent.target.result);
        };
        FR.readAsDataURL(file);
    });
};

const resizeImage = (dataURL) => {
    const Img = new Image();
    Img.src = dataURL;
    return new Promise((resolve, reject) => {
        Img.onerror = () => {
            Image.abort();
            reject(new DOMException("Image解析字串時出現錯誤"));
        };
        Img.onload = (imageEvent) => {
            let canvas = document.createElement('canvas'),
            max_size = 400,// TODO : pull max size from a site config
            width = Img.width,
            height = Img.height;
            if (width > height) {
                if (width > max_size) {
                    height *= max_size / width;
                    width = max_size;
                }
            } else {
                if (height > max_size) {
                    width *= max_size / height;
                    height = max_size;
                }
            }
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(Img, 0, 0, width, height);
            const minifiedDataURL = canvas.toDataURL('image/jpeg');
            const base64 = minifiedDataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
            resolve(base64);
        };
    });
};

export async function uploadImgur (file) {
    try {
        const dataURL = await readFileAsText(file);
        const base64 = await resizeImage(dataURL);
        return axios.post('https://api.imgur.com/3/image', {'image': base64}, imgurAuthHeader);
    } catch (error) {
        errorLog('uploadImgur error: ', error.message);
    };
}