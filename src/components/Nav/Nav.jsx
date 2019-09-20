import React from 'react';
import styles from './Nav.module.scss';
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.item} >
                <NavLink to="/Profile" activeClassName={styles.activeLink}>Profile</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/Dialogs" activeClassName={styles.activeLink}>DIalogs</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/Users" activeClassName={styles.activeLink}>Users</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/Dialogs">Some content</NavLink>
            </div>
            <div className={styles.item}>
                <NavLink to="/Dialogs">Some content</NavLink>
            </div>
        </nav>

    )
}

export default Nav;