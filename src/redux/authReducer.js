import { authAPI, profileAPI, securityAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'authReducer/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'authReducer/GET_CAPTCHA_URL_SUCCESS';
const SET_USER_AVATAR = 'authReducer/SET_USER_AVATAR';

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false,
    captchaUrl: null,
    userAvatar: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
            case SET_USER_AVATAR:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
};

export const setAuthUserAvatar = (userAvatar) => {
    return {
        type: SET_USER_DATA,
        payload: { userAvatar }
    }
};

export const getCaptchaUrlSuccess = (captchaUrl) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
};

export const getAuthUser = () => async (dispatch) => {
    let response = await authAPI.getAuth();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        let responseProfileData = await profileAPI.getProfile(id)
        dispatch(setAuthUserData(id, email, login, true));
        dispatch(setAuthUserAvatar(responseProfileData.photos.small));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
        dispatch(getAuthUser());
    } else {
        if (response.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.messages.length > 0 ? response.messages[0] : 'some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}


export const getCaptchaUrl = () => async (dispatch) => {
    
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;
