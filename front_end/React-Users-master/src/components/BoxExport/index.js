import styles from './BoxExport.module.scss';
import classNames from 'classnames/bind';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useReducer } from 'react';

const urlExport = 'http://localhost:9000/products/create-paint-export';
const urlDetail = 'http://localhost:9000/products/detail-paint-item/';
const cx = classNames.bind(styles);
const initState = {
    productExport: '',
    productsExport: {},
    productsExportTotal: {}
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
                ...state,
                productsExport: [...state.productExport, action.payload],
            };
        }

        default:
            throw new Error('Invalid value');
    }
};

function ButtonExport({ props }) {
    const id = props;

    const [state, dispatch] = useReducer(reducer, initState);

    const { productExport, productsExport,productsExportTotal } = state;

    console.log(productsExport)

    const handleAdd = () => {
        dispatch(addProduct(productExport));
        dispatch(setProduct(''));
    };

    const handleSelect = (e) => {
        e.target.classList.add('hide');
        const wrapper = e.target.closest('div');
        wrapper.querySelector('div').classList.add('active');
    };

    const handleCancelSelect = (e) => {
        e.target.classList.add('active');
        const wrapper = e.target.closest('div');
        wrapper.querySelector('div').classList.add('hide');
    };

    return (
        <div className={cx('wrapper')}>
            <button
                onClick={handleSelect}
                id="btn-wrapper"
                className={cx('btn', 'btn-success')}
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
    );
}

export default ButtonExport;
