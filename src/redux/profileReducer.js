import { profileAPI } from '../api/api';

const ADD_POST = 'profileReducer/ADD_POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_STATUS = 'profileReducer/SET_STATUS';
const DELETE_POST = 'profileReducer/DELETE_POST';

const initialState = {
    postData: [
        {
            id: 1,
            post: "asdd",
            likesCount: 34
        },
        {
            id: 2,
            post: "df",
            likesCount: 323345
        },
        {
            id: 3,
            post: "11111",
            likesCount: 312
        },
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                post: action.payload,
                likesCount: 0,
            };
            return {
                ...state,
                postData: [...state.postData, newPost]
            }
        case DELETE_POST:
            return {
                ...state,
                postData: state.postData.filter(v => v.id != action.payload)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state;
    }

};

export const addPostActionCreator = (payload) => {
    return {
        type: ADD_POST,
        payload
    }
}

export const deletePost = (payload) => {
    return {
        type: DELETE_POST,
        payload
    }
}

export const setUserProfile = (payload) => {
    return {
        type: SET_USER_PROFILE,
        payload
    }
}

export const setUserStatus = (payload) => {
    return {
        type: SET_STATUS,
        payload
    }
}



export const getUserData = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response));

}


export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response));
}


export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.resultCode === 0) {
        dispatch(setUserStatus(status));
    }

}

export default profileReducer;