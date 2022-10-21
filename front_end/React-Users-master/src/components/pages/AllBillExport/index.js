import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './AllBillExport.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);


function AllBillExport() {
    const url = 'http://localhost:9000/products/list-paint-export'
    const urlDelete = 'http://localhost:9000/products/delete-paint-export/'

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadList();
    }, []);

    const loadList = async () => {
        const result = await axios.get(url);
        const value = result.data.response
        setProducts(value);
    }

    const deleteProduct = async (id) => {
        await axios.delete(
            `http://localhost:9000/products/delete-paint-export/${id}`,
        );
        loadList();
    };

  

    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Tất cả hóa đơn xuất hàng</h1>
                <table className={cx('table', 'table-bordered')}>
                    <thead className={cx('thead-dark')}>
                        <tr>
                            <th className={cx('table-custom')} scope="col">
                                #Id
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Tên khách hàng
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Số điện thoại khách hàng
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Tổng số tiền mua hàng
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Thời gian xuất hóa đơn
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Tác vụ
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
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
                                             deleteProduct(product.id)}
                                    >
                                        Xóa
                                    </Link>
                                </td>

                            </tr>
                        ))}

                    </tbody>


                </table>
            </div>













        </div>
    )
}

export default AllBillExport