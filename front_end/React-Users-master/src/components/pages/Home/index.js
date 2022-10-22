import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PaginationTable from '../../DataTable/PaginationTable';
import HomeHeader from '../../DataTable/HomeHeader';

const cx = classNames.bind(styles);

const url = 'http://localhost:9000/products';

const Home = () => {
    const urlExport = 'http://localhost:9000/products/create-paint-export';

    const box = document.querySelector('.box');

    const [products, setProduct] = useState([]);

    const [productExport, setProductExport] = useState({
        amount: '',
        id: '',
    });

    const [productsExport, setProductsExport] = useState([]);

    const [userInfo, setUserInfo] = useState({
        full_name: '',
        phone_number: '',
    });

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;


    const { full_name, phone_number } = userInfo;

    const { amount, id } = productExport;

    const onInputChange = (e) => {
        setProductExport({
            ...productExport,
            id: e.target.dataset.id,
            [e.target.name]: e.target.value,
        });
    };

    const onBoxInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        if (e.target.closest('td').querySelector('input').value === '') {
            alert('Vui lòng nhập số lượng');
        } else {
            setProductsExport((prev) => {
                const detailExport = [...prev, productExport];
                return detailExport;
            });

            

            const wrapper = e.target.closest('td');

            const inputValue = wrapper.querySelector('input');
            inputValue.value = '';
            box.style.display = 'block';
        }

        setProductExport({
            id: '',
            amount: '',
        });
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
        const exportItems = {
            paint_export_items: [...productsExport],
            ...userInfo,
        };

        await axios
            .post(urlExport, { ...exportItems })
            .then(function(value) {
                const id = value.data.response.id;

                window.location = `/detailbillexport/${id}`;
            })

            .catch(function() {
                alert('Vui lòng nhập thông tin xuất hàng phù hợp');
            });
        box.style.display = 'none';
    };

    const data = useMemo(() => {
        let computedData = products

        setTotalItems(computedData.length)

        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
    }, [products, currentPage])


    return (
        <div className={cx('container')}>
            <div className={cx('py-4')}>
                <h1 className={cx('header-title')}>Tồn kho</h1>
                <table className={cx('table', 'table-bordered')}>
                   <HomeHeader />
                    <tbody>
                        {data.map((product, index) => (
                            <tr>
                                <th className={cx('table-custom')} scope="row">
                                    {++index}
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
                    </tbody>
                </table>
                <PaginationTable
                    total={totalItems}
                    itemsPerpage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            <div className={cx('box')} style={{ display: 'none' }}>
                <div className={cx('form-group')}>
                    <input
                        type="text"
                        className={cx('form-control form-control-lg')}
                        placeholder="Nhập tên khách hàng"
                        name="full_name"
                        value={full_name}
                        onChange={(e) => onBoxInputChange(e)}
                    />
                </div>
                <div className={cx('form-group')}>
                    <input
                        type="number"
                        className={cx('form-control', 'form-control-lg')}
                        placeholder="Nhập số điện thoại khách hàng"
                        name="phone_number"
                        value={phone_number}
                        onChange={(e) => onBoxInputChange(e)}
                    />
                </div>

                <button
                    onClick={confirmExport}
                    className={cx('btn btn-primary', 'btn-block')}
                >
                    Xác nhận xuất hàng
                </button>
            </div>
        </div>
    );
};

export default Home;
