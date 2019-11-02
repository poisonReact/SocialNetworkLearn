import React from 'react';
import styles from './Profile.module.scss';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {

    
    
    return (
        <div>
            <ProfileInfo 
            errors={props.errors}
            profile={props.profile} 
            status={props.status}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            saveProfile={props.saveProfile}
            updateUserStatus={props.updateUserStatus}
            setEditModeForStatus={props.setEditModeForStatus}
            editModeForStatus={props.editModeForStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;