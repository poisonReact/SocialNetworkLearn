
import { getAuthUser } from './authReducer';

const INITIALIZED_SUCCEED = 'INITIALIZED_SUCCEED';


const initialState = {
    initialized: false,

}

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case INITIALIZED_SUCCEED:
            return {
                ...state,
                initialized: true
                

            }
        default:
            return state;
    }

}

export const initializedSucceed = () => {
    return {
        type: INITIALIZED_SUCCEED,
    }
};


export const inintializeApp = () => {
    
    return (dispatch) => {
        let promise = dispatch(getAuthUser())
        
        Promise.all([promise]).then( () => {
            dispatch(initializedSucceed())
        })
       
    }
}


export default appReducer;
