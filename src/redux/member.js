import * as memberAPI from '../fetch/memberAPI';

const LOGIN_TRUE = 'LOGIN_TRUE';
const LOGIN_FALSE = 'LOGIN_FALSE';

export function fetchMember() {
    return (dispatch) => {
        memberAPI.getMember()
                 .then((res) => {
                    if (res.data.validToken) {
                        dispatch({
                            type: LOGIN_TRUE,
                            member: res.data.member,
                        });
                    } else {
                        dispatch({
                            type: LOGIN_FALSE,
                        }); 
                    }
                 }) 
                 .catch(err => console.log('fetchMember Error:', err));
    };
}

export function logout() {
    return (dispatch) => {
        localStorage.removeItem('memberCuid');
        localStorage.removeItem('memberName');
        localStorage.removeItem('memberAvatar');
        localStorage.removeItem('memberToken');
        dispatch({
            type: LOGIN_FALSE,
        });
    };
}

const initialState = {
    cuid: '',
    name: '',
    avatar: '', // token不應該當成state
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_TRUE:
            return {
                ...state,
                cuid: action.member.cuid,
                name: action.member.name,
                avatar: action.member.avatar,
            };
        case LOGIN_FALSE:
            return {
                ...state,
                cuid: '',
                name: '',
                avatar: '',
            };
        default:
            return state;
    }
};