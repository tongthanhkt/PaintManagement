import styles from './BoxExport.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const urlExport = 'http://localhost:9000/products/create-paint-export';
const urlDetail = 'http://localhost:9000/products/detail-paint-item/';

const cx = classNames.bind(styles);

function BoxExport({ props }) {
    const id = props;

    const [productExport, setProductExport] = useState('');
    const [productsExport, setProductsExport] = useState([]);
    // const [wrapProductsExport, setWrapProductsExport] = useState([])

    const exportItem = { paint_export_items: productsExport };
    console.log(exportItem);
    const onSubmit = async () => {

    
        await axios.post(urlExport, exportItem);
    };

    const handleAdd = (e) => {


        setProductsExport(() => {
            const detailProductsExport = [{ amount: productExport, id: id }];

            return detailProductsExport;
           
        });
        onSubmit()
        setProductExport('');
        
        handleCancelSelect(e);
    };

    const handleSelect = (e) => {
        const targetElement = e.target;

        targetElement.classList.remove('active');
        const wrapper = targetElement.closest('div');
        wrapper.querySelector('div').classList.add('active');
    };

    const handleCancelSelect = (e) => {
        const targetElement = e.target;

        targetElement.classList.remove('active');
        const inputWrapper = targetElement.closest('div');
        const btnElement = inputWrapper.parentElement.querySelector(
            '#btn-wrapper',
        );
        inputWrapper.classList.remove('active');

        btnElement.classList.add('active');
    };

    return (
        <td>
            <div className={cx('wrapper')}>
                <button
                    onClick={handleSelect}
                    id="btn-wrapper"
                    className={cx('btn', 'btn-success', 'active')}
                >
                    Chọn
                </button>

                <div id="input-wrapper" className={cx('input-wrapper')}>
                    <input
                        type="number"
                        className={cx('input')}
                        placeholder="Nhập số lượng"
                        name="productExport"
                        value={productExport}
                        onChange={(e) => {
                            setProductExport(e.target.value);
                        }}
                    />

                    <button
                        onClick={handleCancelSelect}
                        className={cx('btn', 'btn-danger')}
                    >
                        Hủy
                    </button>

                    <button
                        onClick={handleAdd}
                        id="btn"
                        className={cx('btn', 'btn-light')}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </td>
    );
}

export default BoxExport;
