import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import ButtonConfirmExport from '../../ButtonConfirmExport';
import e from 'express';
import { response } from 'express';
const cx = classNames.bind(styles);

const url = 'http://localhost:9000/products';

const Home = () => {
    const urlExport = 'http://localhost:9000/products/create-paint-export';

    const [products, setProduct] = useState([]);
    const [productExport, setProductExport] = useState({
        amount: '',
        id: '',
    });

    const [productsExport, setProductsExport] = useState([]);

    const [revertId, setRevertId] = useState();

    console.log(revertId);
    const { amount, id } = productExport;

    const onInputChange = (e) => {
        setProductExport({
            ...productExport,
            id: e.target.dataset.id,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = (e) => {
        if (e.target.closest('td').querySelector('input').value === '') {
            alert('Vui lòng nhập số lượng');
        } else {
            setProductsExport((prev) => {
                const detailExport = [...prev, productExport];
                return detailExport;
            });

            setProductExport({
                id: '',
                amount: '',
            });

            const wrapper = e.target.closest('td');

            const inputValue = wrapper.querySelector('input');
            inputValue.value = '';
        }
    };

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

    const confirmExport = async (e) => {
        // const targetValue = e.target
        // console.log(targetValue);
        const exportItems = {
            paint_export_items: [...productsExport],
        };
        await axios
            .post(urlExport, { ...exportItems })
            .then(function(response) {
                const value = response.data;
                const idExport = value.response.id;

                return idExport;
            })

            // .then(function(result) {

            // })

            .catch(function() {
                alert('Vui lòng nhập số lượng phù hợp');
            });

    };

    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Tồn kho</h1>
                <table className={cx('table', 'table-bordered')}>
                    <thead className={cx('thead-dark')}>
                        <tr>
                            <th className={cx('table-custom')} scope="col">
                                #Id
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
                                    <input
                                        data-id={product.id}
                                        data-index={index}
                                        type="number"
                                        placeholder="Nhập số lượng"
                                        name="amount"
                                        onChange={(e) => onInputChange(e)}
                                    />

                                    <button
                                        onClick={onSubmit}
                                        data-id={product.id}
                                    >
                                        Xác nhận
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* <button onClick={confirmExport}>Xác nhận</button> */}
                    </tbody>
                    <Link
                        class="btn btn-danger"
                        onClick={confirmExport}
                        to={`/detail-paint-export`}
                    >
                        Xác nhận
                    </Link>
                </table>
            </div>
        </div>
    );
};

export default Home;
