import React, {useState, useEffect} from 'react';
import styles from './ProfileInfo.module.scss';
import Preloader from '../../../common/Preloader/Preloader';

const ProfileStatusWithHooks = (props) => {

    let [status, setStatus] = useState(props.status)

    useEffect( () => {
        setStatus(props.status);
    }, [props.status] )

    const activateEditMode = () => {
        if (props.isOwner) {
        props.setEditModeForStatus(true)
        }
    } 

    const deactivateEditMode = () => {
        props.updateUserStatus(status)
        
    }

    const onStatusChange =(e) => {
        setStatus(e.currentTarget.value)
    }

    return (
            <span>
                {!props.editModeForStatus &&
                    <div>
                        <span className={styles.statusString} onDoubleClick={activateEditMode}>{props.status || '-------'}</span>
                        <div>{props.errors}</div>
                    </div>
                    
                }
                {props.editModeForStatus &&
                    <div>
                        <textarea cols={123} rows={3} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                        <div>{props.errors}</div>
                        </div>
                }
            </span>   
    )
}

export default ProfileStatusWithHooks;