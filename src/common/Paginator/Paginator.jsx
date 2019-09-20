import React, { useState } from 'react';
import styles from './paginator.module.scss'



let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 5 }) => {




    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let totalPortionQuantity = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let firstItemInPortion = (portionNumber - 1) * portionSize + 1;
    let lastItemInPortion = portionNumber * portionSize

    return (

        <div>
            {portionNumber > 1 &&
                <button onClick={() => {
                    setPortionNumber(portionNumber - 1);
                    onPageChanged(lastItemInPortion - portionSize)
                    }}> Prev </button>}
            <span>
                {pages
                    .filter(p => p >= firstItemInPortion && p <= lastItemInPortion)
                    .map((p) => {
                        return <span
                            className={currentPage === p && styles.selectedPage}
                            onClick={() => { onPageChanged(p) }}>{p}</span>
                    })}
            </span>
            {portionNumber < totalPortionQuantity &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1);
                    onPageChanged(firstItemInPortion + portionSize )
                    }}> Next </button>}
        </div>
    )
}


export default Paginator