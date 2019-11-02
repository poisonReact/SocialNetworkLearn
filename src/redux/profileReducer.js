import { profileAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const ADD_POST = 'profileReducer/ADD_POST';
const SET_USER_PROFILE = 'profileReducer/SET_USER_PROFILE';
const SET_STATUS = 'profileReducer/SET_STATUS';
const DELETE_POST = 'profileReducer/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profileReducer/SAVE_PHOTO_SUCCESS';
const SET_ERROR = 'profileReducer/SET_ERROR';
const SET_EDIT_MODE = 'profileReducer/SET_EDIT_MODE';


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
    editModeForStatus: false,
    status: '',
    errors: null,
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
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload }
            }
        case SET_ERROR:
            return {
                ...state,
                errors: action.payload
            }
        case SET_EDIT_MODE:
            return {
                ...state,
                editModeForStatus: action.payload
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

export const setEditModeForStatus = (payload) => {
    return {
        type: SET_EDIT_MODE,
        payload
    }
}

export const deletePost = (payload) => {
    return {
        type: DELETE_POST,
        payload
    }
}

export const setError = (payload) => {
    return {
        type: SET_ERROR,
        payload
    }
}

export const savePhotoSuccess = (payload) => {
    return {
        type: SAVE_PHOTO_SUCCESS,
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
        dispatch(setEditModeForStatus(false))
        dispatch(setError(null))
    } else {
        
        dispatch(setError(response.messages[0]));
        setTimeout(() => {
            // ... even asynchronously!
            dispatch(setError(null))
          }, 6000)

    }


}

export const savePhoto = (file) => async (dispatch) => {

    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {

        dispatch(savePhotoSuccess(response.data.data.photos));
    }

}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {

        dispatch(getUserData(userId));
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
        dispatch(stopSubmit('profileData', { _error: message }))
        return Promise.reject(response.data.messages[0])

    }

}


export default profileReducer;