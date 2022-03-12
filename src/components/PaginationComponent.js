import React, { useState, useEffect } from 'react'
import Pagination from 'react-paginate';
import './PaginationComponent.css';
import { reactLocalStorage } from 'reactjs-localstorage';

function PaginationComponent(props) {

    const { items, rowsPerPage, paginatedItems, searchActive } = props;

    const [sPage, setsPage] = useState(1);
    const [sItemcount, setsItemCount] = useState(0);
    const [sStartcount, setsStartCount] = useState(0);
    const [sEndcount, setsEndCount] = useState(0);
    const [sShowNext, setsShowNext] = useState(true);


    const previousPage = () => {
        reactLocalStorage.set('pageNo', sPage - 1);
        setsPage(sPage - 1);
    };
    const nextPage = () => {
        reactLocalStorage.set('pageNo', sPage + 1);
        setsPage(sPage + 1);
    }

    useEffect(() => {
        if (sPage && items) {
            const startIndex = ((sPage - 1) * rowsPerPage) + 1;
            setsStartCount(startIndex);
            const itemSliceIndex = startIndex - 1;
            const endIndex = startIndex + rowsPerPage - 1;
            if (endIndex <= items.length) {
                setsEndCount(endIndex);
                setsShowNext(true);
            } else {
                setsEndCount(items.length);
                setsShowNext(false);
            }
            const paginatedData = items.slice(itemSliceIndex, endIndex);
            paginatedItems(paginatedData);
        }
    }, [sPage, items]);

    useEffect(() => {
        setsItemCount(items.length)
    }, [items]);

    useEffect(() => {
        if (searchActive) {
            setsPage(1);
        }
    }, [searchActive]);

    return (
        <div className='pagination-container'>
            {sPage !== 1 && <button type='button' className='previous pagination-button' onClick={previousPage}>
                Previous
            </button>
            }
            <p> {sStartcount} - {sEndcount} out of {sItemcount}</p>
            {sShowNext &&
                <button type='button' className='next pagination-button' onClick={nextPage}>
                    Next
                </button>
            }
        </div>
    )
}

export default PaginationComponent