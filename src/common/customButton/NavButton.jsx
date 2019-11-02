import React from 'react';
import styles from './customButton.module.scss';
import { NavLink } from "react-router-dom";


const NavButton = ({ route,
    content,
    buttonHeight = `30px`,
    buttonWidth = `60px`,
    buttonJustifyContent = `center`,
    isContainActiveClassName = false }) => {

    let activeCN = null;
    if (isContainActiveClassName) {
        activeCN = styles.activeLink
    }

    const stylesFromProps = {
        height: buttonHeight,
        width: buttonWidth,
        justifyContent: buttonJustifyContent
    }


    return (
        <div className={styles.ButtonWrapper}>
        <NavLink to={route} activeClassName={activeCN}>
            <div style={stylesFromProps}
                className={styles.customButton}
            >{content}</div>
        </NavLink>
        </div>
    )
}

export default NavButton;