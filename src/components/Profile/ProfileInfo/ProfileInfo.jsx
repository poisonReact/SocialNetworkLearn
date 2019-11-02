import React, {useState, useEffect} from 'react';
import styles from './ProfileInfo.module.scss';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import ProfileDataForm from './ProfileDataForm'
import userPhotoPng from '../../../assets/images/user.png'


const ProfileInfo = ({ profile, status, updateUserStatus, isOwner, savePhoto, saveProfile, errors, setEditModeForStatus, editModeForStatus }) => {
    let [editMode, setEditMode] = useState(false)

    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
        

    if (!profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    return (

        <div className={styles.descriptionBlock}>
            <img src={profile.photos.large || userPhotoPng} className={styles.mainPhoto} />
            {isOwner &&
                <input
                    type={"file"}
                    onChange={onMainPhotoSelected}
                />}
            <div>

                <div>
                    <b>Status: </b>
                    <ProfileStatusWithHooks
                        errors={errors}
                        status={status}
                        updateUserStatus={updateUserStatus}
                        isOwner={isOwner} 
                        setEditModeForStatus={setEditModeForStatus}
                        editModeForStatus={editModeForStatus}/>
                </div>
                { editMode 
                    ? <ProfileDataForm initialValues={profile} profile={profile} saveChanges={() => {setEditMode(false)}} onSubmit={onSubmit}/> 
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {setEditMode(true)}}/>}
                

            </div>


        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={styles.contact}>
            <b>{contactTitle}: </b>{contactValue}
        </div>
    )

}

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner &&
                <button onClick={goToEditMode}>edit</button>
            }
            <div>
                <b>Full Name: </b> {profile.fullName}
            </div>
            <div>
                <b>Looking for a job: </b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My skills: </b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me: </b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map((key, i) => {
                    return <Contact key={i} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>

        </div>
    )
}



export default ProfileInfo;