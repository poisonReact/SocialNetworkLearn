import React from 'react';
import Paginator from '../../common/Paginator/Paginator';
import styles from './users.module.scss'
import User from './User';


let Users = ({ totalUsersCount,
    pageSize,
    currentPage,
    currentPortion,
    portionSize,
    onPageChanged,
    onPortionChanged,
    users,
    followingInProgress,
    unfollow,
    follow,
    ...props }) => {



    return (

        <div>
            <div className={styles.paginatorWrapper}>
                <Paginator
                    className={styles.paginator}
                    currentPage={currentPage}
                    portionSize={portionSize}
                    currentPortion={currentPortion}
                    onPageChanged={onPageChanged}
                    onPortionChanged={onPortionChanged}
                    totalItemsCount={totalUsersCount}
                    pageSize={pageSize}
                />
            </div>
            <div className={styles.usersWrapper}>
                {users.map(u =>
                    <User
                        key={u.id}
                        user={u}
                        followingInProgress={followingInProgress}
                        unfollow={unfollow}
                        follow={follow}




                    />)}
            </div>
        </div>
    )
}


export default Users