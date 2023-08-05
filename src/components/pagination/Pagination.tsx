import React from 'react';
import { Pagination } from 'antd';

const TablePagination: React.FC = () => <Pagination defaultCurrent={1} total={50} />;

export default TablePagination;
