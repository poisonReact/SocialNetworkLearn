import React from 'react';
import styles from './Preloader.module.scss';
import preloader from '../../assets/images/preloader.svg'

let Preloader = (props) => {
    return (<div className={styles.preloader}>
        <img src={preloader}/>
    </div>)
}

export default Preloader