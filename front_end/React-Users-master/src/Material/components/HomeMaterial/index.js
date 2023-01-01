import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

import styles from './HomeMaterial.module.scss';
import classNames from 'classnames/bind';
import PaginationTable from '../../../components/DataTable/PaginationTable';
import HomeHeaderMaterial from '../../../components/DataTable/HomeHeaderMaterial';
import { useHistory } from 'react-router-dom';
// import './index.css';
const cx = classNames.bind(styles);

const url = 'https://be-paint-management1.onrender.com/products/material/list-material-items';

const Home = () => {
    const urlExport =
        'https://be-paint-management1.onrender.com/products/material/create-material-export';
    const history = useHistory();

    const box = document.querySelector('.export-form');

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
        address: '',
    });

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 20;

    const { full_name, phone_number, address } = userInfo;

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
            `https://be-paint-management1.onrender.com/products/material/delete-material-items/${id}`,
        );

        loadProduct();
    };

    const confirmExport = async (e) => {
        const exportItems = {
            material_export_items: [...productsExport],
            ...userInfo,
        };
        console.log(exportItems);
        await axios
            .post(urlExport, { ...exportItems })
            .then(function (value) {
                const id = value.data.response.id;

                window.location = `/detailbillexportmaterial/${id}`;
            })

            .catch(function () {
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
        <div className={cx('container')} style={{ maxWidth: '1600px' }}>
            <div>
                <h1 className={cx('header-title')}>Tồn kho VLXD</h1>
                <table
                    className={cx('table', 'table-bordered')}
                    style={{ width: '' }}
                >
                    <HomeHeaderMaterial />
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
                                    {++index}
                                </th>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.product_id}
                                </td>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.product_name}
                                </td>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.product_price}
                                </td>

                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.dvt}
                                </td>
                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.amount}
                                </td>

                                <td
                                    className={cx(
                                        'table-custom',
                                        'text-center',
                                        'align-middle',
                                    )}
                                >
                                    {product.description}
                                </td>
                                <td
                                    className={cx(
                                        'table-action',
                                        'text-center',
                                    )}
                                    style={{ height: '82px' }}
                                >
                                    <button
                                        type="button"
                                        class="btn btn-info m-2 btn-lg"
                                        onClick={() =>
                                            history.push(
                                                `/productsmaterial/${product.id}`,
                                            )
                                        }
                                    >
                                        Chi tiết
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-secondary m-2 btn-lg"
                                        onClick={() =>
                                            history.push(
                                                `/productsmaterial/edit/${product.id}`,
                                            )
                                        }
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger m-2 btn-lg"
                                        onClick={() =>
                                            deleteProduct(product.id)
                                        }
                                    >
                                        Xóa
                                    </button>
                                </td>
                                <td>
                                    <div className="wrap-export">
                                        <input
                                            data-id={product.id}
                                            data-index={index}
                                            data-name={product.product_name}
                                            data-dvt={product.dvt}
                                            type="number"
                                            placeholder="Nhập số lượng"
                                            name="amount"
                                            onChange={(e) => onInputChange(e)}
                                            className="input"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-success m-2 btn-lg export-btn"
                                            onClick={onSubmit}
                                            data-name={product.product_name}
                                            data-dvt={product.dvt}
                                        >
                                            Xuất hàng
                                        </button>
                                    </div>
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

            <div className="export-form">
                <div className="wrapper w-75 mx-auto shadow p-5 ">
                    <h3 className="export-info">Thông tin xuất hàng</h3>

                    <div className="container">
                        <div class="form-wrapper">
                            <div class="mb-3">
                                <label class="form-label">Sản phẩm xuất</label>
                                {detailProductExport.map((item, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        class="form-control form-control-lg form-item form-edit "
                                        id="inputItem"
                                        value={`${item.amount} ${item.dvt} ${item.name}`}
                                        disable
                                        readOnly
                                    />
                                ))}
                            </div>
                            <div class="mb-3">
                                <label class="form-label" for="inputName">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    class="form-control form-control-lg form-edit"
                                    id="inputName"
                                    placeholder="Nhập tên khách hàng"
                                    name="full_name"
                                    value={full_name}
                                    onChange={(e) => onBoxInputChange(e)}
                                />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="inputName">
                                    Số điện thoại
                                </label>
                                <input
                                    type="text"
                                    class="form-control form-control-lg form-edit"
                                    id="inputName"
                                    placeholder="Nhập số điện thoại khách hàng"
                                    name="phone_number"
                                    value={phone_number}
                                    onChange={(e) => onBoxInputChange(e)}
                                />
                            </div>

                            <div class="mb-3">
                                <label class="form-label" for="inputName">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    class="form-control form-control-lg form-edit"
                                    id="inputName"
                                    placeholder="Nhập địa chỉ"
                                    name="address"
                                    value={address}
                                    onChange={(e) => onBoxInputChange(e)}
                                />
                            </div>

                            <button
                                onClick={confirmExport}
                                class="btn btn-success btn-lg btn-export"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
