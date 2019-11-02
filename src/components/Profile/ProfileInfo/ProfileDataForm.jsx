import React, { useState, useEffect } from 'react';
import styles from './ProfileInfo.module.scss';
import { createField, Input, Textarea } from '../../../common/FormsControls/formControls';
import { Contact } from './ProfileInfo';
import { Field, reduxForm } from 'redux-form'

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <button>Save Changes</button>
            <div>
                <b>Full Name: </b> {createField("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job: </b> {createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            
                <div>
                    <b>My skills: </b> {createField("My skills", "lookingForAJobDescription", [], Textarea)}
                </div>
        
            <div>
                <b>About me: </b> {createField("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts: </b> {Object.keys(profile.contacts).map((key, i) => {
                    return <div className={styles.contact}>
                        <b>{key}: { createField(key, "contacts." + key, [], Input)}</b>
                    </div>

                })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({ form: "profileData" })(ProfileDataForm)

export default ProfileDataFormReduxForm;