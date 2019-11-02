import React from 'react';
import styles from './customButton.module.scss';


const CustomButton = ({content,
    buttonHeight = `30px`,
    buttonWidth = `60px`,
    buttonJustifyContent = `center`,
    onClickHandler}) => {


    const stylesFromProps = {
        height: buttonHeight,
        width: buttonWidth,
        justifyContent: buttonJustifyContent
    }


    return (
        <div className={styles.ButtonWrapper}>
            <div style={stylesFromProps} 
                className={styles.customButton}
                onClick={onClickHandler}
            >{content}
            </div>
        </div>
    )
}

export default CustomButton;