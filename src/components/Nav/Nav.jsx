import React from 'react';
import styles from './Nav.module.scss';
import NavButton from '../../common/customButton/NavButton';


const Nav = () => {
    const buttonWidth = `180px`;
    const buttonHeight = `30px`;
    const isContainActiveClassNamet = true;
    
    return (



        <div className={styles.nav}>
            <NavButton route={"/Profile"}
                content={"Profile"}
                buttonHeight={buttonHeight}
                buttonWidth={buttonWidth}
                isContainActiveClassName={isContainActiveClassNamet}
            />
            <NavButton route={"/Dialogs"}
                content={"Dialogs"}
                buttonHeight={buttonHeight}
                buttonWidth={buttonWidth}
                isContainActiveClassName={isContainActiveClassNamet}
            />
            <NavButton route={"/Users"}
                content={"Users"}
                buttonHeight={buttonHeight}
                buttonWidth={buttonWidth}
                isContainActiveClassName={isContainActiveClassNamet}
            />
            
        </div>

    )
}

export default Nav;