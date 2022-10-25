import axios from 'axios';
// import styles from 'DetailBillExport.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Link, NavLink } from 'react-router-dom';

function DetailBillExport() {
    const [product, setProduct] = useState([]);
    const [products, setProducts] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const result = await axios.get(
            `http://localhost:9000/products/detail-paint-export/${id}`,
        );

        const value = result.data.response;
        const detail = result.data.response.paint_export_items

        setProduct(value);
        setProducts(detail)
    };

    

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/home">
                Trở về trang chủ
            </Link>

            <hr />
            <ul className="list-group w-50">
                <li className="list-group-item">
                    Tên khách hàng: {product.full_name}
                </li>
                <li className="list-group-item">
                    Số điện thoại khách hàng: {product.phone_number}
                </li>

                <li className="list-group-item">
                    Tổng giá trị hàng hóa {product.total_export_price} VND
                </li>
                <li className="list-group-item">
                    Thời gian xuất hàng: {product.created_time}
                </li>
                <li className="list-group-item">
                    Chi tiết đơn hàng:
                    <ul>
                        {products.map((data, index) => (
                           <li key={index}>{data.amount} {data.dvt} {data.product_name}</li>
                       ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DetailBillExport;
