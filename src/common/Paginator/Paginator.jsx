import React from 'react';
import styles from './paginator.module.scss'
import cn from 'classnames'



let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, onPortionChanged, portionSize, currentPortion}) => {




    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let totalPortionQuantity = Math.ceil(pagesCount / portionSize)
    let firstItemInPortion = (currentPortion - 1) * portionSize + 1;
    let lastItemInPortion = currentPortion * portionSize

    return (

        <div className={styles.paginatorWrapper}>
            {currentPortion > 1 &&
                <button onClick={() => {
                    onPortionChanged(currentPortion - 1);
                    onPageChanged(lastItemInPortion - portionSize)
                    }}> Prev </button>}
            <span className={styles.pagesWrapper}>
                {pages
                    .filter(p => p >= firstItemInPortion && p <= lastItemInPortion)
                    .map((p) => {
                        return <span
                            className={ cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                            onClick={() => { onPageChanged(p) }}>{p}</span>
                    })}
            </span>
            {currentPortion < totalPortionQuantity &&
                <button onClick={() => {
                    onPortionChanged(currentPortion + 1);
                    onPageChanged(firstItemInPortion + portionSize )
                    }}> Next </button>}
        </div>
    )
}


export default Paginator