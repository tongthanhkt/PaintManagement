import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './AddProductMaterial.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AddProductMaterial = () => {
    const url = 'https://be-paint-management1.onrender.com/products/material/create-material-item';
    let history = useHistory();
    const [product, setProduct] = useState({
        product_name: '',
        product_id: '',
        product_price: '',
        dvt: '',
        amount: '',
        description: '',
    });

    const { product_name,product_id, product_price, dvt, amount, description } = product;
    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(url, product);
        history.push('/homematerial');
    };

    return (
        <td>
            <div className={cx('container')}>
                <div className={cx('w-75 mx-auto', 'shadow p-5')}>
                    <h2 className={cx('text-center', 'mb-4')}>Thêm sản phẩm</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx('form-control form-control-lg')}
                                placeholder="Nhập tên sản phẩm"
                                name="product_name"
                                value={product_name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx('form-control form-control-lg')}
                                placeholder="Mã hàng"
                                name="product_id"
                                value={product_id}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="number"
                                className={cx(
                                    'form-control',
                                    'form-control-lg',
                                )}
                                placeholder="Nhập giá mỗi sản phẩm"
                                name="product_price"
                                value={product_price}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx(
                                    'form-control',
                                    'form-control-lg',
                                )}
                                placeholder="Nhập đơn vị tính"
                                name="dvt"
                                value={dvt}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="number"
                                className={cx(
                                    'form-control',
                                    'form-control-lg',
                                )}
                                placeholder="Nhập số lượng sản phẩm"
                                name="amount"
                                value={amount}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx(
                                    'form-control',
                                    'form-control-lg',
                                )}
                                placeholder="Ghi chú"
                                name="description"
                                value={description}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button
                            className={cx('btn btn-success', 'btn-block')}
                            style={{
                                marginRight: 'auto',
                                marginLeft: 'auto',
                                height: '40px',
                                width: '120px',
                                marginTop: '20px',
                                fontSize: '14px',
                            }}
                        >
                            Thêm sản phẩm
                        </button>
                    </form>
                </div>
            </div>
        </td>
    );
};

export default AddProductMaterial;
