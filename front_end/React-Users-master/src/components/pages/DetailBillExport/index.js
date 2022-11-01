import axios from 'axios';
// import styles from 'DetailBillExport.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect,useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

import { Link, NavLink } from 'react-router-dom';
import './index.css';
import Example from '../../Print';

function DetailBillExport() {
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    const { id } = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get(
            `http://localhost:9000/products/detail-paint-export/${id}`,
        );

        const value = result.data.response;
        const detail = result.data.response.paint_export_items;

        setProduct(value);
        setProducts(detail);
    };

    return (
        <div className="wrapper" ref={componentRef}>
            <div className="w-75 mx-auto shadow p-5 detail" >
                <h2 className="text-center mb-4">Chi tiết hóa đơn</h2>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Tên khách hàng</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.full_name}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Địa chỉ</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.address}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Số điện thoại</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.phone_number}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Tổng giá trị hàng hóa </label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={`${product.total_export_price} VND`}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Thời gian xuất hóa đơn</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.created_time}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Chi tiết sản phẩm</label>

                        {products.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                class="form-control form-control-lg form-item form-edit "
                                id="inputItem"
                                value={` ${data.amount} ${data.dvt} ${data.product_name}`}
                                disable
                                readOnly
                            />
                        ))}
                    </div>

                </form>
                    <button className='btn btn-primary btn-lg' onClick={handlePrint}>In hóa đơn</button>
            </div>
            {/* <Example /> */}
        </div>
    );
}

export default DetailBillExport;
