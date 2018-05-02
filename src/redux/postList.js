import * as postAPI from '../fetch/postAPI';

const FETCH_POSTS = 'FETCH_POSTS';

export function fetchPosts () {
    return (dispatch) => {
        postAPI
            .getPosts()
            .then((res) => {
                // console.log('res.data.posts:', res.data.posts);
                if (res.status === 200) {
                    dispatch({
                        type: FETCH_POSTS,
                        posts: res.data.posts,
                    });
                }
            })
            .catch(err => console.log('fetchMember Error:', err));
    };
}

const initialState = [];

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return action.posts;
        default:
            return state;
    }
}