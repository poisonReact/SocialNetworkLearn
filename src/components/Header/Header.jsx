import React, {useState, useEffect} from 'react';
import styles from './Header.module.scss';

import logo from '../../assets/images/logo.png'
import NavButton from '../../common/customButton/NavButton';
import CustomButton from '../../common/customButton/CustomButton';
import cn from 'classnames'



const Header = (props) => {
    let [status, setStatus] = useState(props.login)

    useEffect( () => {
        setStatus(props.login);
    }, [props.avatar] )
 
    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <img src={logo} className={styles.logo} alt="logo" />
                <span className={styles.logoHeader} >Developers Social Network</span>
            </div>
            <div className={styles.loginWrapper}>
                    <img className={cn({ [styles.avatarLogouted]: props.isAuth === false }, styles.avatarLogined)} src={props.avatar} />
                <span className={cn({ [styles.userLogouted]: props.isAuth === false }, styles.userLogined)}>{status}</span>
                {props.isAuth
                    ?
                        <CustomButton
                            content={"logout"}
                            buttonHeight={`40px`}
                            buttonWidth={`80px`}
                            onClickHandler={props.logout}
                        />

                    : <NavButton route={"/login"}
                        content={"login"}
                        buttonHeight={`40px`}
                        buttonWidth={`80px`}
                    />}
            </div>

        </header>
    )
}

export default Header;

//<button className={styles.logout} onClick={props.logout}>LogOut</button>