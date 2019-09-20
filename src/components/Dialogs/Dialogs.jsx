import React from 'react';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogsItem';
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form'
import { Textarea } from '../../common/FormsControls/formControls';
import {required, maxLengthCreator} from './../../utils/validators/validators'

const maxLength10 = maxLengthCreator(10)

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"New Message"} 
                name={"newMessage"} 
                component={Textarea}
                validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}


const DialogsReduxForm = reduxForm({ form: "dialogs" })(DialogsForm)




const Dialogs = ({ messagePage, addMessage }) => {
    const onSubmit = (values) => {
        console.log(values.newMessage)
        addMessage(values.newMessage);
    }

    let dialogsMaped = messagePage.dialogData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />);
    let messagesMaped = messagePage.messageData.map(message => <Message message={message.message} key={message.id} />)



    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsMaped}
            </div>
            <div className={styles.messages}>
                <div>
                    {messagesMaped}
                </div>
                <div>
                    <DialogsReduxForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;