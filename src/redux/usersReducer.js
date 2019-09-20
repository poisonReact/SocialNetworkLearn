
import { usersAPI } from '../api/api';
import { updateObjectInArray } from '../utils/objectHelpers';

const FOLLOW = 'usersReducer/FOLLOW';
const UNFOLLOW = 'usersReducer/UNFOLLOW';
const SET_USERS = 'usersReducer/SET_USERS';
const SET_CURRENT_PAGE = 'usersReducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersReducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersReducer/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersReducer/TOGGLE_IS_FOLLOWING_PROGRESS';



const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],

}

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })

            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress ?
                    [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state;
    }

};

export const followSuccess = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollowSuccess = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
}

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
}

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

export const setTotalUsersCount = (totalUsersCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const toggleFollowingProgress = (followingInProgress, userId) => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress, userId
    }
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    let response = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => async (dispatch) => {
    let apiMethod = usersAPI.setFollow.bind(usersAPI);
    let actionCreator = followSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

}


export const unfollow = (userId) => async (dispatch) => {
    let apiMethod = usersAPI.setUnfollow.bind(usersAPI);
    let actionCreator = unfollowSuccess
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator)

}

export default usersReducer;