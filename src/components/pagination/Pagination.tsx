import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageNumbers: number[];
    handlePrevPaginationTabClick: () => void;
    handleNextPaginationTabClick: () => void;
    setCurrentPage: (page: number) => void;
}

function Pagination({
                        currentPage,
                        totalPages,
                        pageNumbers,
                        handlePrevPaginationTabClick,
                        handleNextPaginationTabClick,
                        setCurrentPage,
                    }: PaginationProps) {
    const preparePaginationTabClassName = (page: number): string => {
        if (page === currentPage) {
            return `${styles.pagination_element} ${styles.active}`;
        }
        return `${styles.pagination_element}`;
    };

    // Определение, какие страницы показать в пагинации
    let visiblePages: number[] = [];
    if (totalPages <= 5) {
        visiblePages = pageNumbers;
    } else if (currentPage <= 3) {
        visiblePages = pageNumbers.slice(0, 5);
    } else if (currentPage >= totalPages - 2) {
        visiblePages = pageNumbers.slice(totalPages - 5);
    } else {
        visiblePages = pageNumbers.slice(currentPage - 3, currentPage + 2);
    }

    return (
        <div className={styles.pagination}>
            <div
                className={styles.pagination_element}
                onClick={() => handlePrevPaginationTabClick()}
            >
                &#60;
            </div>
            {visiblePages.map((page, index) => (
                page === 0 ? (
                    <div className={styles.pagination_dots} key={index}>...</div>
                ) : (
                    <div
                        className={preparePaginationTabClassName(page)}
                        key={index}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </div>
                )
            ))}
            <div
                className={styles.pagination_element}
                onClick={() => handleNextPaginationTabClick()}
            >
                &#62;
            </div>
        </div>
    );
}

export default Pagination;
