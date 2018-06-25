import axios from 'axios';
import { authHeader } from './authHeader';

export function deletePost (cuid) {
    return axios.delete(`/api/post/${cuid}`, authHeader());
}

export function updatePost (post) {
    return axios.put(`/api/post`, {
        cuid: post.cuid,
        title: post.title,
        cover: post.cover,
        story: post.story,
        charactor: post.charactor,
        city: post.city,
        district: post.district,
        age: post.age,
        gender: post.gender,
        isSpay: post.isSpay,
        requirements: post.requirements,
        remark: post.remark,
        contact: post.contact,
        contactInfo: post.contactInfo
    }, authHeader());
}

export function getFavoritePosts () {
    return axios.get(`/api/favoritePosts?${+Date.now()}`, authHeader());
}

// 由member.cuid取得該member的所有文章
export function getPostsByAuthor () {
    return axios.get(`/api/myPosts?${+Date.now()}`, authHeader());
}

// 由post.cuid取得一篇文章
export function getOnePost(cuid) {
    return axios.get(`/api/post/${cuid}?${+Date.now()}`);
}

// 取得posts
export function getPosts(pageNum) {
    return axios.get(`/api/posts?page=${pageNum}`);
}

// 搜尋posts
export function searchPosts(pageNum, query) {
    return axios.get(`/api/search?query=${query}&page=${pageNum}`);
}

// 新增post
export function createPost (post) {
    return  axios.post(`/api/post?${+Date.now()}`, {
                title: post.title,
                cover: post.cover,
                story: post.story,
                charactor: post.charactor,
                city: post.city,
                district: post.district,
                age: post.age,
                gender: post.gender,
                isSpay: post.isSpay,
                requirements: post.requirements,
                remark: post.remark,
                contact: post.contact,
                contactInfo: post.contactInfo,
                author: post.author
            }, authHeader());
};
