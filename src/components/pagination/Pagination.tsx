import React from 'react';
import { Pagination } from 'antd';

interface TablePaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
                                                             currentPage,
                                                             setCurrentPage,
                                                             totalItems,
                                                             itemsPerPage,
                                                         }) => (
    <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        pageSize={itemsPerPage}
        total={totalItems}
    />
);

export default TablePagination;
