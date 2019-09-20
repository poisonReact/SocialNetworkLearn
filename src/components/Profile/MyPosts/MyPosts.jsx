import React, { PureComponent } from 'react';
import styles from './MyPosts.module.scss';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form'
import { required, maxLengthCreator } from './../../../utils/validators/validators'
import { Textarea } from '../../../common/FormsControls/formControls';


const maxLength10 = maxLengthCreator(10)

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"New post"}
                    name={"newPost"}
                    component={Textarea}
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )

}

const MyPostReduxForm = reduxForm({ form: "myPosts" })(MyPostForm)

const MyPosts =React.memo( (props) => {
    const onSubmit = (values) => {
        console.log(values.newPost)
        props.addPost(values.newPost)
    }

    let postsMaped = props.profilePage.postData.map(post => <Post message={post.post} key={post.id} likeCount={post.likesCount} />)
    return (
        <div className={styles.MyPosts}>
            <h3>My Posts</h3>
            <MyPostReduxForm onSubmit={onSubmit}/>
            {postsMaped}
        </div>
    )
})


export default MyPosts;

/*

*/