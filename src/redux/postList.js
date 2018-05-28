import * as postAPI from '../fetch/postAPI';

const FETCH_POSTS = 'FETCH_POSTS';
const ADD_POST_LIST = 'ADD_POST_LIST';
const UPDATE_POST_LIST = 'UPDATE_POST_LIST';
const DELETE_POST_LIST = 'DELETE_POST_LIST';

export function deletePostList (cuid) {
    return (dispatch) => {
        dispatch({
            type: DELETE_POST_LIST,
            postCuid: cuid,
        });
    }; 
}

export function updatePostList (updatedPost) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_POST_LIST,
            updatedPost: updatedPost,
        });
    };
}

export function addPostList (newPost) {
    return (dispatch) => {
        dispatch({
            type: ADD_POST_LIST,
            post: newPost,
        });
    };
}

export function fetchPosts () {
    return (dispatch) => {
        postAPI
            .getPosts()
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: FETCH_POSTS,
                        posts: res.data.posts,
                    });
                }
            })
            .catch(err => console.log('fetchMember Error:', err.message));
    };
}

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return [...action.posts];
        case ADD_POST_LIST:
            return [action.post, ...state];      
        case UPDATE_POST_LIST:
            return [...state].map((post, index) => {
                if (post.cuid === action.updatedPost.cuid) {
                    return {
                        ...post,
                        title: action.updatedPost.title,
                        cover: action.updatedPost.cover,
                        story: action.updatedPost.story,
                        charactor: action.updatedPost.charactor,
                        city: action.updatedPost.city,
                        district: action.updatedPost.district,
                        age: action.updatedPost.age,
                        gender: action.updatedPost.gender,
                        isSpay: action.updatedPost.isSpay,
                        requirements: [...post.requirements].map((item, index) => {
                            return item.name === action.updatedPost.requirements[index].name ? 
                                {...item, 
                                    value: action.updatedPost.requirements[index].value } : item;
                        }),
                        remark: action.updatedPost.remark,
                        contact: action.updatedPost.contact,
                        contactInfo: action.updatedPost.contactInfo,
                        lastModify: action.updatedPost.lastModify,
                    };
                } else {
                    return post;
                }
            });
        case DELETE_POST_LIST:
            return state.filter(post => post.cuid !== action.postCuid); 
        default:
            return state;
    }
}