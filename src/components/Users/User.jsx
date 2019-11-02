import React from 'react';
import styles from './users.module.scss'
import userPhotoPng from '../../assets/images/user.png'
import { NavLink } from "react-router-dom";



let User = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <div className={styles.userWrapper}>
            <span>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img src={user.photos.large != null ? user.photos.large : userPhotoPng} className={styles.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                unfollow(user.id)
                            }}>Unfollow
                            </button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                follow(user.id)
                            }}>Follow
                            </button>
                    }

                </div>
            </span>
            <span>
                <span>
                    <div className={styles.userName}><b>Name: </b>{user.name}</div>
                    <div className={styles.userStatus}><b>Status: </b>{user.status}</div>
                </span>
            </span>

        </div>
    )
}

export default User