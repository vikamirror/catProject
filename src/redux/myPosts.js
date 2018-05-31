import * as postAPI from '../fetch/postAPI';

const FETCH_MY_POSTS = 'FETCH_MY_POSTS';
const ADD_MY_POST = 'ADD_MY_POST';
const UPDATE_MY_POST = 'UPDATE_MY_POST';
const DELETE_MY_POST = 'DELETE_MY_POST';

export function deleteMyPost (cuid) {
    return (dispatch) => { 
        dispatch({
            type: DELETE_MY_POST,
            postCuid: cuid,
        });
    }; 
}

export function fetchMyPosts (cuid) {
    return (dispatch) => {
        postAPI
            .getPostsByAuthor(cuid)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: FETCH_MY_POSTS,
                        posts: res.data.posts,
                    });
                }
            })
            .catch(err => console.error(err.response.data));
    };
};

export function addMyPost (addedPost) {
    return (dispatch) => { 
        dispatch({
            type: ADD_MY_POST,
            newPost: addedPost,
        });
    };
};

export function updateMyPost (updatedPost) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_MY_POST,
            updatedPost: updatedPost,
        });
    };
}

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MY_POSTS:
            return [...action.posts];
        case ADD_MY_POST:
            return [action.newPost, ...state];
        case UPDATE_MY_POST:
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
        case DELETE_MY_POST:
            return state.filter(post => post.cuid !== action.postCuid);
        default:
            return state;
    }
}