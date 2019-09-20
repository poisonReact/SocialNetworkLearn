import React from 'react';
import styles from '../Dialogs.module.scss';
import {NavLink} from "react-router-dom";


const DialogItem = (props) => {
    return (
        <div className={styles.dialog}>
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </div>

    )
}

export default DialogItem;