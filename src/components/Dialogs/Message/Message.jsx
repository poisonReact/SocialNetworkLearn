import React from 'react';
import styles from '../Dialogs.module.scss';

const Message = (props) => {
    return (
        <div className={styles.dialog}>
            {props.message}
        </div>

    )
}

export default Message;