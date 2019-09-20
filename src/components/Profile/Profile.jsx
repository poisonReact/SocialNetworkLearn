import React from 'react';
import styles from './Profile.module.scss';

import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';


const Profile = (props) => {

    
    
    return (
        <div>
            <ProfileInfo profile={props.profile} 
            status={props.status}
            
            updateUserStatus={props.updateUserStatus}/>
            <MyPostsContainer />
        </div>
    )
}

export default Profile;