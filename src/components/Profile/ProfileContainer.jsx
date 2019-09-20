import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'
import {getUserData, getUserStatus, updateUserStatus} from './../../redux/profileReducer'
import { withRouter } from "react-router-dom";

import { compose } from 'redux';


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getUserData(userId)
        this.props.getUserStatus(userId)
    }

    

    render() {
        
        return (
            <div>
                <Profile {...this.props} 
                profile={this.props.profile} 
                status={this.props.status}
                
                updateUserStatus={this.props.updateUserStatus}/>
            </div >
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    iaAuth: state.auth.isAuth
   
    
})


export default compose(
    withRouter,
    connect(mapStateToProps, {getUserData, getUserStatus, updateUserStatus}),
    
    //withAuthRedirect
)(ProfileContainer)