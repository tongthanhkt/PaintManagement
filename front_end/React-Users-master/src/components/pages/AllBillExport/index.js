import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './AllBillExport.module.scss';
import classNames from 'classnames/bind';
import Header from '../../DataTable/Header';
import PaginationTable from '../../DataTable/PaginationTable';
import './index.css';

const cx = classNames.bind(styles);

function AllBillExport() {
    const url = 'https://be-paint-management1.onrender.com/products/paint/list-paint-export';
    const urlDelete = 'https://be-paint-management1.onrender.com/products/delete-paint-export/';

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
            // `https://be-paint-management1.onrender.com/products/delete-paint-export/${id}`,
            `https://be-paint-management1.onrender.com/products/paint/delete-paint-export/${id}`
            
        );
        loadList();
    };

    const data = useMemo(() => {
        let computedData = products;

        setTotalItems(computedData.length);

        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
        );
    }, [products, currentPage]);

    return (
        <div className={cx('container-custom')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>
                    Thống kê đơn hàng đã xuất
                </h1>
                <table className={cx('table', 'table-bordered')}>
                    <Header />
                    <tbody>
                        {data.map((product, index) => (
                            <tr>
                                <th
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                    scope="row"
                                >
                                    {index + 1}
                                </th>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.full_name}
                                </td>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.phone_number}
                                </td>

                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.total_export_price}
                                </td>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.created_time}
                                </td>

                                <td
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '70px',
                                        with: '100px',
                                    }}
                                >
                                    <Link
                                        class="btn btn-info"
                                        to={`/detailbillexport/${product.id}`}
                                        style={{ width: '150px' }}
                                    >
                                        Chi tiết đơn hàng
                                    </Link>
                                </td>

                                <td>
                                    <Link
                                        class="btn btn-danger"
                                        onClick={() =>
                                            deleteProduct(product._id)
                                        }
                                        style={{ marginTop: '15px' }}
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
