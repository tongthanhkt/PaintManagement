import React, { useState, useEffect, useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination'

function PaginationTable({
    total = 0,
    itemsPerPage = 20,
    currentPage = 2,
    onPageChange,
}) {
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(total / itemsPerPage));
        }
    }, [total, itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}
                </Pagination.Item>,
            );
        }

        return pages;
    }, [totalPages, currentPage]);

    if(totalPages === 0) return null
    return (
        <Pagination>
            <Pagination.prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.next
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
}

export default PaginationTable;

