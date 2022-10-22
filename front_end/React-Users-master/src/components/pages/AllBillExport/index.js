import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './AllBillExport.module.scss';
import classNames from 'classnames/bind';
import Header from '../../DataTable/Header';
import PaginationTable from '../../DataTable/PaginationTable';

const cx = classNames.bind(styles);

function AllBillExport() {
    const url = 'http://localhost:9000/products/list-paint-export';
    const urlDelete = 'http://localhost:9000/products/delete-paint-export/';

    const [products, setProducts] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get(url);
        const value = result.data.response;
        setProducts(value);

    
    };



    const deleteProduct = async (id) => {
        await axios.delete(
            `http://localhost:9000/products/delete-paint-export/${id}`,
        );
        loadList();
    };

    const data = useMemo(() => {
        let computedData = products

        setTotalItems(computedData.length)

        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [products, currentPage])

    console.log(data)

    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Tất cả hóa đơn xuất hàng</h1>
                <table className={cx('table', 'table-bordered')}>
                    <Header />
                    <tbody>
                        {data.map((product, index) => (
                            <tr>
                                <th className={cx('table-custom')} scope="row">
                                    {index + 1}
                                </th>
                                <td className={cx('table-custom')}>
                                    {product.full_name}
                                </td>
                                <td className={cx('table-custom')}>
                                    {product.phone_number}
                                </td>

                                <td className={cx('table-custom')}>
                                    {product.total_export_price}
                                </td>
                                <td className={cx('table-custom')}>
                                    {product.created_time}
                                </td>

                                <td>
                                    <Link
                                        class="btn btn-danger"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Xóa
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PaginationTable
                    total={totalItems}
                    itemsPerpage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default AllBillExport;
