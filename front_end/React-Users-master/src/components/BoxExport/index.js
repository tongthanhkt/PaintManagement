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


    const [productExport, setProductExport] = useState({amount: ''});

    const { amount } = productExport;

    const [productsExport, setProductsExport] = useState([]);



    const onInputChange = (e) => {
        setProductExport({ ...productExport, id, [e.target.name]: e.target.value });

        setProductsExport(() => {
            const detailProductsExport = [

                {  ...productExport},
            ];
            return detailProductsExport;
        });
    };


    const exportItems = {
        paint_export_items: [...productsExport],
    };

    console.log(exportItems);



    const onSubmit = async () => {
        axios.post(urlExport, exportItems).catch(function() {
            alert('Vui lòng kiểm tra lại!!');
        });
    };

    const handleAdd = () => {
        setProductsExport((prev) => {
            const detailProductsExport = [
                ...prev,
                { id, amount: productExport.amount },
            ];
            return detailProductsExport;
        });
    };

    return (

            <input
                multiple={true}
                data-id={id}
                type="number"
                className={cx('input')}
                placeholder="Nhập số lượng"
                name="amount"
                value={amount}
                onChange={(e) => {
                    onInputChange(e);
                }}
            />

    );
}

export default BoxExport;
