import * as memberAPI from '../fetch/memberAPI';
import { removeMemberCached } from '../fetch/accessLocalStorage';
import * as sockets from '../sockets/notification';

const LOGIN_TRUE = 'LOGIN_TRUE';
const LOGIN_FALSE = 'LOGIN_FALSE';
const ADD_FAVORITE_POST = 'ADD_FAVORITE_POST';
const DELETE_FAVORITE_POST = 'DELETE_FAVORITE_POST';
const CHANGE_AVATAR = 'CHANGE_AVATAR';
const CHANGE_NAME = 'CHANGE_NAME';
const LAST_TIME_LOGOUT = 'LAST_TIME_LOGOUT';

// 監聽上次登出時間
export function onListenLastLogoutTime () {
    return (dispatch) => {
        const receivedLastLogoutTimeHandler = (time) => {
            dispatch({
                type: LAST_TIME_LOGOUT,
                time: time
            });
        };
        sockets.lastLogoutTimeListener(receivedLastLogoutTimeHandler);
    };
}

export function updateMember (memberInfo, updateResult) {
    const infoForUpdate = {
        name: memberInfo.name,
        email: memberInfo.email,
    };
    return (dispatch) => {
        memberAPI
            .updateMember(infoForUpdate)
            .then(res => {
                updateResult(res.status);
                if (res.status === 200) {
                    dispatch({
                        type: CHANGE_NAME,
                        name: memberInfo.name,
                    });
                }
            })
            .catch(err => {
                err.response ? console.error(err.response.data) : console.error('removeFavoritePost unhandled error:', err.message);
            });
    };
}

export function changeAvatar (avatarURL) {
    const memberInfo = {
        avatar: avatarURL,
    };
    return (dispatch) => {
        memberAPI
            .updateMember(memberInfo)
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: CHANGE_AVATAR,
                        avatar: avatarURL
                    });
                }
            })
            .catch(err => {
                err.response ? console.error(err.response.data) : console.error('removeFavoritePost unhandled error:', err.message);
            });
    };
}

export function removeFavoritePost (postCuid) {
    return (dispatch) => {
        memberAPI
            .removeFavoritePost(postCuid)
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: DELETE_FAVORITE_POST,
                        cuid: postCuid
                    });
                }
            })
            .catch(err => {
                err.response ? console.error(err.response.data) : console.error('removeFavoritePost unhandled error:', err.message);
            });
    }
}

export function addFavoritePost (postCuid) {
    return (dispatch) => {
        memberAPI
            .addFavoritePost(postCuid)
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: ADD_FAVORITE_POST,
                        post: {
                            cuid: postCuid
                        },
                        // post: {
                        //     postCuid: postCuid,
                        //     dateAdded: new Date().toISOString()
                        // }
                    });
                }
            })
            .catch(err => {
                err.response ? console.error(err.response.data) : console.error('addFavoritePost unhandled error:', err.message);
            });
    };
};

export function fetchMember() {
    return (dispatch) => {
        memberAPI
            .getMember()
            .then((res) => {
                if (res.status === 200) {
                    dispatch({
                        type: LOGIN_TRUE,
                        member: res.data.member,
                    });
                }
            }) 
            .catch(err => {
                dispatch({
                    type: LOGIN_FALSE,
                });
                console.log('fetchMember Error:', err);
            });
    };
};

export function logout() {
    return (dispatch) => {
        removeMemberCached();
        dispatch({
            type: LOGIN_FALSE,
        });
    };
}

const initialState = {
    cuid: '',
    name: '',
    avatar: '',
    favoritePosts: [],
    lastTimeLogout: '',
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_TRUE:
            return {
                ...state,
                cuid: action.member.cuid,
                name: action.member.name,
                avatar: action.member.avatar,
                favoritePosts: action.member.favoritePosts,
            };
        case LOGIN_FALSE:
            return {
                ...state,
                cuid: '',
                name: '',
                avatar: '',
                favoritePosts: [],
                lastTimeLogout: '',
            };
        case ADD_FAVORITE_POST:
            return {
                ...state,
                favoritePosts: [action.post, ...state.favoritePosts],
            };
        case DELETE_FAVORITE_POST:
            return {
                ...state,
                // favoritePosts: state.favoritePosts.filter((postCuid, index) => postCuid !== action.postCuid)
                favoritePosts: state.favoritePosts.filter((post, index) => post.cuid !== action.cuid)
            };
        case CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.avatar,
            };
        case CHANGE_NAME:
            return {
                ...state,
                name: action.name
            };
        case LAST_TIME_LOGOUT:
            return {
                ...state,
                lastTimeLogout: action.time,
            }
        default:
            return state;
    }
};