import React from 'react';

import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
    setCurrentPortion
} from '../../redux/usersReducer'

import {
    getUsersSuperSelector,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingInProgress,
    getCurrentPortion,
    getPortionSize
} from '../../redux/usersSelectors'
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader';
import { compose } from 'redux';


class UsersContainer extends React.Component {
    

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize);
        
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize);

    }

    onPortionChanged = (portionNumber) => {
        this.props.setCurrentPortion(portionNumber);

    }

    render() {

        return (
            <>
                {(this.props.isFetching && this.firstLoad)
                ? <Preloader />
                : <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    currentPortion={this.props.currentPortion}
                    portionSize={this.props.portionSize}
                    users={this.props.users}
                    onPageChanged={this.onPageChanged}
                    onPortionChanged={this.onPortionChanged}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress={this.props.followingInProgress}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    isFetching={this.props.isFetching}/>
            }
            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        users: getUsersSuperSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        currentPortion: getCurrentPortion(state),
        portionSize:  getPortionSize(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    }
}


export default compose(
        connect(mapStateToProps, {follow, unfollow, setCurrentPage, getUsers, setCurrentPortion}),
    )(UsersContainer)
