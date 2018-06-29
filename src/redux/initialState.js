const initialState = {
    member: {
        cuid: '',
        name: '',
        avatar: '',
        favoritePosts: [],
    },
    dialog: {
        isShow: false,
        type: undefined,
        title: '',
        htmlString: '',
        inputPlaceholder: '',
        showCancelButton: false,
        cancelButtonText: '取消',
        showConfirmButton: true,
        confirmButtonText: '確定',
        onClickCancelButton: undefined,
        onClickConfirmButton: undefined,
        buttonsAlign: 'center',
        modalVerticalAlign: 'middle',
        textEditor: {
            content: '',
            enableUploadImg: false
        },
    },
    isSmallDevice: false,
    isLoading: false,
    post: {
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
    },
    postList: [],
    searchPosts: {
        query: '',
        posts: [],
        loadedIds: [],
    },
    notification: {
        unSeenNotificationCount: 0,
        notifications: []
    },
    header: 'initial_header',
};

export default initialState;