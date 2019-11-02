import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { Input, createField } from '../../common/FormsControls/formControls';
import { required, maxLengthCreator } from './../../utils/validators/validators'
import { connect } from 'react-redux';
import { login } from './../../redux/authReducer';
import { Redirect } from 'react-router-dom';
import styles from '../../common/FormsControls/formControls.module.scss'

const maxLength50 = maxLengthCreator(50)


const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", [required, maxLength50], Input)}
            {createField("Password", "password", [required, maxLength50], Input, { type: "password" })}
            {createField(null, "rememberMe", [], Input, { type: "checkbox" }, "Remember Me")}

            { captchaUrl && <img src={captchaUrl}/> }
            { captchaUrl && createField("synbols from image", "captcha", [required], Input, ) }

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm)

const Login = (props) => {
    const onSubmit = (values) => {
        props.login(values.email, values.password, values.rememberMe, values.captcha)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login)