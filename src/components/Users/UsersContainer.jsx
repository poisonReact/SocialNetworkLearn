import React from 'react';

import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    setCurrentPage,
    getUsers
} from '../../redux/usersReducer'
import {
    getUsersSuperSelector,
    getUsersSelector,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress
    


} from '../../redux/usersSelectors'
import Users from './Users';

import Preloader from '../../common/Preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
        /*
        this.props.toggleIsFetching(true)

        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount)
        })
        */
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);

        /*
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
        */
    }

    render() {

        return (
            <>
                {this.props.isFetching && <Preloader />}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                />
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        //users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}


/*
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users))
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalUsersCountActionCreator(totalCount))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(toggleIsFetchingActionCreator(isFetching))
        },
    }
}
*/

export default compose(
        connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers}),
        //withAuthRedirect
    )(UsersContainer)
