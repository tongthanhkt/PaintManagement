import styles from './BoxExport.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

const urlExport = 'http://localhost:9000/products/create-paint-export';
const urlDetail = 'http://localhost:9000/products/detail-paint-item/';

const cx = classNames.bind(styles);

function BoxExport({ props }) {
    const id = props;

    const [productExport, setProductExport] = useState('');

    const [productsExport, setProductsExport] = useState([]);

    const onInputChange = (e) => {
        setProductExport(e.target.value);
        setProductsExport(() => {
            const detailProductsExport = [{ id, amount: productExport }];
            return detailProductsExport;
        });
    };

    const setProducts = () => {};

    console.log(productsExport);

    const exportItems = {
        paint_export_items: [...productsExport],
    };

    const onSubmit = async () => {
        axios.post(urlExport, exportItems).catch(function() {
            alert('Vui lòng kiểm tra lại!!');
        });
    };

    return (
        <input
            type="number"
            className={cx('input')}
            placeholder="Nhập số lượng"
            name="productExport"
            value={productExport}
            onChange={(e) => {
                onInputChange(e);
            }}
        />
    );
}

export default BoxExport;
