import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailProduct = () => {
    const [product, setProduct] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        loadProduct();
    }, []);
    const loadProduct = async () => {
        const result = await axios.get(
            `https://be-paint-management1.onrender.com/products/material/detail-material-item/${id}`,
        );

        const value = result.data.response;

        setProduct(value[0]);
    };

    return (
        <div className="wrapper">
            <div className="w-75 mx-auto shadow p-5 detail">
                <h2 className="text-center mb-4">Chi tiết sản phẩm</h2>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Tên sản phẩm</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.product_name}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Giá mỗi sản phẩm (VND)</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.product_price}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Đơn vị tính</label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.dvt}
                            disable
                            readOnly
                        />
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Số lượng tồn kho </label>

                        <input
                            type="text"
                            class="form-control form-control-lg form-item form-edit "
                            id="inputItem"
                            value={product.amount}
                            disable
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DetailProduct;
