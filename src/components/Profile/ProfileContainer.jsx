import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'
import { getUserData, getUserStatus, updateUserStatus, savePhoto, saveProfile, setEditModeForStatus } from './../../redux/profileReducer'
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileContainer extends React.Component {

    refreshProfile() {
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

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if ((this.props.match.params.userId != prevProps.match.params.userId) ) {
            this.refreshProfile();
        }
    }



    render() {

        return (
            <div>
                <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    savePhoto={this.props.savePhoto}
                    errors={this.props.errors}
                    updateUserStatus={this.props.updateUserStatus}
                    setEditModeForStatus={this.props.setEditModeForStatus}
                    editModeForStatus={this.props.editModeForStatus} />
            </div >
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    errors: state.profilePage.errors,
    editModeForStatus: state.profilePage.editModeForStatus,
    authorizedUserId: state.auth.userId,
    iaAuth: state.auth.isAuth


})


export default compose(
    withRouter,
    connect(mapStateToProps, { getUserData, getUserStatus, updateUserStatus, savePhoto, saveProfile, setEditModeForStatus}),

    withAuthRedirect
)(ProfileContainer)