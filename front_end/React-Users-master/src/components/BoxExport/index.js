import styles from './BoxExport.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useReducer, useState, useEffect } from 'react';

const urlExport = 'http://localhost:9000/products/create-paint-export';
const urlDetail = 'http://localhost:9000/products/detail-paint-item/';

const cx = classNames.bind(styles);

const initState = {
    productExport: '',
    productsExport: [],

};

const SET_PRODUCT = 'set-product';
const ADD_PRODUCT = 'add-product';

const setProduct = (payload) => {
    return {
        type: SET_PRODUCT,
        payload,
    };
};

const addProduct = (payload) => {
    return {
        type: ADD_PRODUCT,
        payload
    };
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_PRODUCT:
            return {
                ...state,
                productExport: action.payload,
            };

        case ADD_PRODUCT: {
            return {

                productsExport: [...state.productExport, action.payload]
            };
        }

        default:
            throw new Error('Invalid value');
    }
};

function BoxExport({ props }) {


    const [state, dispatch] = useReducer(reducer, initState);

    const { productExport, productsExport } = state;






    const handleAdd = (e) => {
        dispatch(addProduct(productExport));
        dispatch(setProduct(''));
        handleCancelSelect(e)
    };

    const handleSelect = (e) => {
        const targetElement = e.target

        targetElement.classList.remove('active');
        const wrapper = targetElement.closest('div');
        wrapper.querySelector('div').classList.add('active');
    };



    const handleCancelSelect = (e) => {

        const targetElement = e.target

        targetElement.classList.remove('active');
        const inputWrapper = targetElement.closest('div');
        const btnElement = inputWrapper.parentElement.querySelector('#btn-wrapper');
        inputWrapper.classList.remove('active')

        btnElement.classList.add('active')

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
                            dispatch(setProduct(e.target.value));
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
