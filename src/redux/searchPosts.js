import * as postAPI from '../fetch/postAPI';

const SEARCHED_POSTS = 'SEARCHED_POSTS';

export function requestSearch (query, loadedIds) {
    return (dispatch) => {
        postAPI
            .searchPosts(query, loadedIds)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: SEARCHED_POSTS,
                        query: query,
                        posts: res.data.posts,
                        loadedIds: [...res.data.posts].map((post, index) => post.cuid),
                    });
                };
            })
            .catch(err => console.log('searchPosts Error:', err.message));
    };
};

const initialState = {
    query: '',
    posts: [],
    loadedIds: [],
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SEARCHED_POSTS:
            return {
                ...state,
                query: action.query,
                posts: [...action.posts],
                loadedIds: [...action.loadedIds],
            };
        default:
            return state;
    }
}