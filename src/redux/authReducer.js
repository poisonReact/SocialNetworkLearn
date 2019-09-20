import { authAPI } from '../api/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'authReducer/SET_USER_DATA';

const initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
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

export const getAuthUser = () => async (dispatch) => {
    let response = await authAPI.getAuth();
    if (response.resultCode === 0) {
        let { id, login, email } = response.data;
        dispatch(setAuthUserData(id, login, email, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe);
    if (response.resultCode === 0) {
        dispatch(getAuthUser());
    } else {
        let message = response.messages.length > 0 ? response.messages[0] : 'some error'
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;
