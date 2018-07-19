const imageForExample = 'https://i.imgur.com/nk7zZL3.jpg';

const SAVE_POST = 'SAVE_POST';
const BACK_TO_INITIAL_STATE = 'BACK_TO_INITIAL_STATE';
const ROLLBACK_POST = 'ROLLBACK_POST';
const BACK_UP_AND_EDIT = 'BACK_UP_AND_EDIT';
const CHANGE_CONTACT_INFO = 'CHANGE_CONTACT_INFO';
const CHANGE_CONTACT = 'CHANGE_CONTACT';
const CHANGE_REMARK = 'CHANGE_REMARK';
const CHANGE_REQUIREMENTS = 'CHANGE_REQUIREMENTS';
const CHANGE_SPAY = 'CHANGE_SPAY';
const CHANGE_GENDER = 'CHANGE_GENDER';
const CHANGE_AGE = 'CHANGE_AGE';
const CHANGE_DISTRICT = 'CHANGE_DISTRICT';
const CHANGE_CITY = 'CHANGE_CITY';
const CHANGE_CHARACTOR = 'CHANGE_CHARACTOR';
const CHANGE_COVER = 'CHANGE_COVER';
const CHANGE_TITLE = 'CHANGE_TITLE';
const CREATE_EMPTY_POST = 'CREATE_EMPTY_POST';
const FETCH_ONE_POST = 'FETCH_ONE_POST';

export function savePost (updatedPost) {
    return (dispatch) => {  
        dispatch({
            type: SAVE_POST,
            post: updatedPost
        });
    };
}

export function clearPost () {
    return (dispatch) => {  
        dispatch({
            type: BACK_TO_INITIAL_STATE
        });
    };
}

export function rollBackPost () {
    return (dispatch) => {  
        dispatch({
            type: ROLLBACK_POST
        });
    };
}

export function backUpAndEdit () {
    return (dispatch) => {  
        dispatch({
            type: BACK_UP_AND_EDIT
        });
    };
}

export function changeContactInfo (contactInfo) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_CONTACT_INFO,
            contactInfo: contactInfo
        });
    };
}

export function changeContact (contact) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_CONTACT,
            contact: contact
        });
    };
}

export function changeRemark (remark) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_REMARK,
            remark: remark
        });
    };
}

export function changeRequirements (index, value) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_REQUIREMENTS,
            index: index,
            value: value,
        });
    };
}

export function changeSpay (isSpay) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_SPAY,
            isSpay: isSpay
        });
    };
}

export function changeGender (gender) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_GENDER,
            gender: gender
        });
    };
}

export function changeAge (age) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_AGE,
            age: age
        });
    };
}

export function changeDistrict (district) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_DISTRICT,
            district: district
        });
    };
}

export function changeCity (city) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_CITY,
            city: city
        });
    };
}

export function changeCharactor (charactor) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_CHARACTOR,
            charactor: charactor
        });
    };
}

export function changeCover (cover) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_COVER,
            cover: cover
        });
    };
}

export function changeTitle (title) {
    return (dispatch) => {  
        dispatch({
            type: CHANGE_TITLE,
            title: title
        });
    };
}

export function createEmptyPost (member) {
    return (dispatch) => {  
        dispatch({
            type: CREATE_EMPTY_POST,
            author: member
        });
    };
};

export function fetchOnePost (post) {
    return (dispatch) => {
        dispatch({
            type: FETCH_ONE_POST,
            post: post
        });
    };
}

let postBackUp = null;

const editorTutorial = `
    <p>這裡是範例, 可將<strong>文字加粗</strong></p><p>也可在這裡插入圖片, 如下圖</p>
    <p><img src="${imageForExample}"></p>
    <p>也可插入超連結 <a href="https://google.com.tw" target="_blank">https://google.com.tw</a></p>
    <p>最右側的按鈕為清除格式</p>
`;

const initialState = {
    cuid: undefined,
    title: '',
    cover: '',
    story: '',
    charactor: '',
    city: '台北市',
    district: '松山區',
    age: '',
    gender: '0',
    isSpay: false,
    requirements: [
        {name:'isAdult', desc:'須年滿20歲', value:false},
        {name:'housemateAgreement', desc:'須經家人或室友同意' ,value:false},
        {name:'financiallyIndependent', desc: '須具備經濟能力，包括每年施打預防針、貓咪生病時的醫藥費負擔', value:false},
        {name:'newHandFriendly', desc: '不排斥養貓新手，但須有正確的飼養觀念', value:false},
        {name:'noAbuse', desc: '不可關籠以及鏈貓，不可有任何虐待貓咪的行為', value:false},
        {name:'noWildRelease', desc: '不能以『野放』的方式養貓，不可讓貓咪單獨外出，外出時請將貓裝入外出籠以保安全', value:false},
        {name:'noticeOfSpay', desc: '須有結紮觀念', value:false},
        {name:'accommodationPeriod', desc: '須同意一週的試養期，若貓咪無法適應，請交還原主', value:false},
        {name:'regularReview', desc: '須接受定期追蹤', value:false},
        {name:'letterOfGuarantee', desc: '須同意簽認養切結書', value:false}
    ],
    remark: '',
    contact: '',
    contactInfo: '',
    dateAdded: '',
    lastModify: '',
    author: {
        name: '',
        avatar: '',
        cuid: ''
    },
    isFetched: false, // 是否拿到後端的post了, 是true的話PostWrapper才會顯示
    isEdit: false, // 是否是編輯模式
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_ONE_POST:
            return {
                ...state,
                cuid: action.post.cuid,
                title: action.post.title,
                cover: action.post.cover,
                story: action.post.story,
                charactor: action.post.charactor,
                city: action.post.city,
                district: action.post.district,
                age: action.post.age,
                gender: action.post.gender,
                isSpay: action.post.isSpay,
                requirements: [...state.requirements].map((item, index) => {
                    return item.name === action.post.requirements[index].name ? 
                        {...item, 
                            value: action.post.requirements[index].value } : item;
                }),
                remark: action.post.remark,
                contact: action.post.contact,
                contactInfo: action.post.contactInfo,
                dateAdded: action.post.dateAdded,
                lastModify: action.post.lastModify,
                author: {
                    ...state.author,
                    name: action.post.author.name,
                    avatar: action.post.author.avatar,
                    cuid: action.post.author.cuid
                },
                isFetched: true,
            };
        case BACK_UP_AND_EDIT:
            postBackUp = JSON.parse(JSON.stringify(state));
            return {
                ...state,
                isEdit: true
            };
        case ROLLBACK_POST:
            return {
                ...state,
                title: postBackUp.title,
                cover: postBackUp.cover,
                story: postBackUp.story,
                charactor: postBackUp.charactor,
                city: postBackUp.city,
                district:postBackUp.district,
                age: postBackUp.age,
                gender: postBackUp.gender,
                isSpay: postBackUp.isSpay,
                requirements: [...state.requirements].map((item, index) => {
                    return item.name === postBackUp.requirements[index].name ? 
                        {...item, 
                            value: postBackUp.requirements[index].value } : item;
                }),
                remark: postBackUp.remark,
                contact: postBackUp.contact,
                contactInfo: postBackUp.contactInfo,
                isEdit: false,
            };
        case SAVE_POST:
            return {
                ...state,
                lastModify: action.post.lastModify,
                isEdit: false,
            };
        case BACK_TO_INITIAL_STATE:
            return {
                ...state,
                cuid: undefined,
                title: '',
                cover: '',
                story: '',
                charactor: '',
                city: '台北市',
                district: '松山區',
                age: '',
                gender: '0',
                isSpay: false,
                requirements: [...state.requirements].map((item, index) => {
                    return {...item, value: false };
                }),
                remark: '',
                contact: '',
                contactInfo: '',
                dateAdded: new Date().toISOString(), // mongoDB預設輸出的字串為ISOString
                lastModify: new Date().toISOString(),
                author: {
                    ...state.author,
                    name: '',
                    avatar: '',
                    cuid: ''
                },
                isFetched: false,
                isEdit: false,
            };
        case CREATE_EMPTY_POST:
            return {
                ...state,
                charactor: editorTutorial,
                author: {
                    ...state.author,
                    name: action.author.name,
                    avatar: action.author.avatar,
                    cuid: action.author.cuid
                },
                isFetched: true,
                isEdit: true,
            };
        case CHANGE_TITLE:
            return {
                ...state,
                title: action.title
            };
        case CHANGE_COVER:
            return {
                ...state,
                cover: action.cover
            };
        case CHANGE_CHARACTOR:
            return {
                ...state,
                charactor: action.charactor
            };
        case CHANGE_CITY:
            return {
                ...state,
                city: action.city
            };
        case CHANGE_DISTRICT:
            return {
                ...state,
                district: action.district
            };
        case CHANGE_AGE:
            return {
                ...state,
                age: action.age
            };
        case CHANGE_GENDER:
            return {
                ...state,
                gender: action.gender
            };
        case CHANGE_SPAY:
            return {
                ...state,
                isSpay: action.isSpay
            };
        case CHANGE_REQUIREMENTS:
            return {
                ...state,
                requirements: [...state.requirements].map((item, index) => {
                    return index === action.index ?
                        {...item, 
                            value: action.value } : item;
                })
            };
        case CHANGE_REMARK:
            return {
                ...state,
                remark: action.remark
            };
        case CHANGE_CONTACT:
            return {
                ...state,
                contact: action.contact
            };
        case CHANGE_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.contactInfo
            };
        default:
            return state;
    }
}

