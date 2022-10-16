import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import BoxExport from '../../BoxExport';

const cx = classNames.bind(styles);

const Home = () => {
    const [products, setProduct] = useState([]);
    const [productsExport, setProductsExport] = useState([]);
    const url = 'http://localhost:9000/products';
    console.log(products);
    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get(url);
        const value = result.data.reverse();

        setProduct(value);
    };

    const deleteProduct = async (id) => {
        await axios.delete(
            `http://localhost:9000/products/delete-paint-items/${id}`,
        );
        loadProduct();
    };

    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Tồn kho</h1>
                <table className={cx('table', 'table-bordered')}>
                    <thead className={cx('thead-dark')}>
                        <tr>
                            <th className={cx('table-custom')} scope="col">
                                # Id
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Tên sản phẩm
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Giá mỗi sản phẩm (VND)
                            </th>

                            <th className={cx('table-custom')} scope="col">
                                Đơn vị tính
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Số lượng sản phẩm
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Tác vụ
                            </th>
                            <th className={cx('table-custom')} scope="col">
                                Xuất hàng
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
                                    {product.product_name}
                                </td>
                                <td className={cx('table-custom')}>
                                    {product.product_price}
                                </td>

                                <td className={cx('table-custom')}>
                                    {product.dvt}
                                </td>
                                <td className={cx('table-custom')}>
                                    {product.amount}
                                </td>
                                <td>
                                    <Link
                                        class="btn btn-primary mr-2"
                                        to={`/products/${product.id}`}
                                    >
                                        Chi tiết
                                    </Link>
                                    <Link
                                        class="btn btn-outline-primary mr-2"
                                        to={`/products/edit/${product.id}`}
                                    >
                                        Chỉnh sửa
                                    </Link>
                                    <Link
                                        class="btn btn-danger"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Xóa
                                    </Link>
                                </td>

                                <td>
                                        <BoxExport props={product.id}/>
                                </td>
                            </tr>
                        ))}
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
