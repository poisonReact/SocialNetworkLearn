import React from 'react';
import styles from './ProfileInfo.module.scss';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'


const ProfileInfo = ({profile, status, updateUserStatus}) => {
    if (!profile) {
        
        return <Preloader />
    } else {
        return (
            <div>
                {/*<div >
                    <img src="https://mirpozitiva.ru/uploads/posts/2016-08/medium/1472042903_31.jpg" />
                </div>*/}
                <div className={styles.descriptionBlock}>
                    <img src={profile.photos.large} />
                    <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                </div>
            </div>
        )
    }
}

export default ProfileInfo;