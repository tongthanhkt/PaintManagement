import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import PaginationTable from '../../DataTable/PaginationTable';
import HomeHeader from '../../DataTable/HomeHeader';
import Alert from '../../Alert';
const cx = classNames.bind(styles);

const url = 'http://localhost:9000/products';

const Home = () => {
    const urlExport = 'http://localhost:9000/products/create-paint-export';

    const modal = document.getElementById('modal');

    const box = document.querySelector('.box');

    const [products, setProduct] = useState([]);

    const [productExport, setProductExport] = useState({
        amount: '',
        id: '',
        product_name: '',
        dvt: '',
    });

    const [statusDelete, setStatusDelete] = useState('');

    const [productsExport, setProductsExport] = useState([]);

    const [detailProductExport, setDetailProductExport] = useState([]);

    const [userInfo, setUserInfo] = useState({
        full_name: '',
        phone_number: '',
    });

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const { full_name, phone_number } = userInfo;

    const { amount, id, product_name, dvt } = productExport;

    const onInputChange = (e) => {
        setProductExport({
            ...productExport,
            id: e.target.dataset.id,
            [e.target.name]: e.target.value,
            product_name: e.target.dataset.name,
            dvt: e.target.dataset.dvt,
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
                const detailExport = [
                    ...prev,
                    {
                        id: productExport.id,
                        amount: productExport.amount,
                    },
                ];

                setDetailProductExport((prev) => {
                    if (
                        productExport.amount !== 'undefined' &&
                        productExport.amount > 0
                    ) {
                        const result = [
                            ...prev,
                            {
                                amount: productExport.amount,
                                dvt: productExport.dvt,
                                name: productExport.product_name,
                            },
                        ];
                        return result;
                    }
                });

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
            `http://localhost:9000/products/delete-paint-export/${id}`,
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
        let computedData = products;

        setTotalItems(computedData.length);

        return computedData.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
        );
    }, [products, currentPage]);

    return (
        <div className={cx('container')} style={{maxWidth: "1400px"}}>
            <div>
                <h1 className={cx('header-title')}>Tồn kho</h1>
                <table className={cx('table', 'table-bordered')} style={{width: ""}}>
                    <HomeHeader />
                    <tbody>
                        {data.map((product, index) => (
                            <tr>
                                <th className={cx('table-custom', 'text-center')} scope="row">
                                    {++index}
                                </th>
                                <td className={cx('table-custom', 'text-center')}>
                                    {product.product_name}
                                </td>
                                <td className={cx('table-custom', 'text-center')}>
                                    {product.product_price}
                                </td>

                                <td className={cx('table-custom', 'text-center')}>
                                    {product.dvt}
                                </td>
                                <td className={cx('table-custom', 'text-center')}>
                                    {product.amount}
                                </td>
                                <td className={cx('table-action')}> 
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
                                            deleteProduct(product._id)
                                        }
                                    >
                                        Xóa
                                    </Link>
                                </td>

                                <td>
                                    <input
                                        data-id={product.id}
                                        data-index={index}
                                        data-name={product.product_name}
                                        data-dvt={product.dvt}
                                        type="number"
                                        placeholder="Nhập số lượng"
                                        name="amount"
                                        onChange={(e) => onInputChange(e)}
                                    />

                                    <button
                                        onClick={onSubmit}
                                        data-name={product.product_name}
                                        data-dvt={product.dvt}
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
                <h3>Thông tin xuất hàng</h3>

                <div className="container py-4">
                    {detailProductExport.map((item, index) => (
                        <ul className="list-group w-50">
                            <li key={index}>
                                {item.amount} {item.dvt} {item.name}
                            </li>
                        </ul>
                    ))}
                </div>
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

            {/* <div id="modal" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Thông báo</h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Bạn có chắc muốn thực hiện tác vụ này ? </p>
                        </div>
                        <div class="modal-footer">
                            <button
                                onClick={(e) =>
                                    setStatusDelete(e.target.dataset.event)
                                }
                                type="button"
                                class="btn btn-primary"
                                data-event="confirm"
                            >
                                Xác nhận
                            </button>
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                                data-event="cancel"
                                onClick={(e) =>
                                    setStatusDelete(e.target.dataset.event)
                                }
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
