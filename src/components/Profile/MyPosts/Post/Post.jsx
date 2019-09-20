import React from 'react';
import styles from './Post.module.scss';

const Post = (props) => {
    return (
        <div className={styles.Post}>
            <div>
                <span>{props.message}</span><span> Likes {props.likeCount}</span>
            </div>
        </div>
    )
}

export default Post;