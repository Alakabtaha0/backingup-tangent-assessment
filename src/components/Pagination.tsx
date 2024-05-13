import React, { useState } from 'react';
import '../styles/master.css';
import { changePage } from '../state/postSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../utils/types';

const Pagination = () => {
    const totalPages = useSelector((state: RootState) => state.posts.numberOfPages);
    const [currentPage, setCurrentPage] = useState<number>(useSelector((state: RootState) => state.posts.currentPage));
    const dispatch = useDispatch();

    return (
        <div className='pagination'>
            <ul>
                {
                    Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        return (
                            <li key={page}
                                className={page === currentPage ? 'active' : ''}
                                onClick={() => {
                                    setCurrentPage(page);
                                    dispatch(changePage(page));
                                }}>
                                <p>{page}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Pagination