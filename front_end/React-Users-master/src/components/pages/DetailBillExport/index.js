import axios from 'axios';
// import styles from 'DetailBillExport.module.scss';
import classNames from 'classnames/bind';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import paintCompanyData from '../../../data/PaintCompanyData';
import { Link, NavLink } from 'react-router-dom';
import './index.css';
import images from '../../../assets/images';
import PaintCompanyData from '../../../data/PaintCompanyData';

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
            <div className="detail">
                <div className="heading_wrapper">
                    <div className="heading-img">
                        <img className="img" src={images.logo} />
                    </div>

                    <div className="eadinhg-info">
                        <h3 className="company-name">
                            {paintCompanyData.companyName}
                        </h3>
                        <p className="company-description">
                            Địa chỉ: {paintCompanyData.address}
                        </p>
                        <p className="company-description">
                            Hotline: {paintCompanyData.hotline}
                        </p>
                        <p className="company-description">
                            Số tài khoản: {paintCompanyData.accountNumber}
                        </p>
                    </div>
                </div>

                <div className="content">
                    <h3 className="content-title">PHIẾU XUẤT KHO BÁN HÀNG</h3>

                    <ul className="customer-info_list">
                        <li className="customer-info">
                            Khách hàng: {product.full_name}
                        </li>

                        <li className="customer-info">
                            Địa chỉ: {product.address}
                        </li>

                        <li className="customer-info">
                            Số điện thoại: {product.phone_number}
                        </li>
                    </ul>

                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên hàng</th>
                                <th>ĐVT</th>
                                <th>Số lượng</th>
                                <th>Đơn giá</th>
                                <th>Thành tiền</th>

                            </tr>
                        </thead>
                        <tbody>
                            {/* <tr>
                                <td>zui</td>
                            </tr> */}

                            {products.map((product, index) => (
                                <tr>
                                    <th scope="row">{++index}</th>

                                    <td>{product.product_name}</td>

                                    <td>{product.dvt}</td>

                                    <td>{product.amount}</td>

                                    <td>{product.product_price}</td>

                                    <td>{product.total_price}</td>
                                    <td rowspan={'1'}>{product.total_price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="footer"></div>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={handlePrint}
                >
                    In hóa đơn
                </button>
            </div>
        </div>
    );
}

export default DetailBillExport;
