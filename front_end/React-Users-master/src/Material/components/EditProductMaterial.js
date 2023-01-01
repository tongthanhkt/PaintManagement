import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const EditProductMaterial = () => {
    let history = useHistory();

    const id = useParams();

    const [editedProduct, setEditedProduct] = useState([]);

    useEffect(() => {
        currentProduct();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(
            `https://be-paint-management1.onrender.com/products/material/update-material-item/${id.id}`,

            editedProduct,
        );
        history.push('/homematerial');
    };

    const currentProduct = async () => {
        const result = await axios.get(
            `https://be-paint-management1.onrender.com/products/material/detail-material-item/${id.id}`,
        );
        const value = result.data.response;
        setEditedProduct(value[0]);
    };

    const onInputChange = (e) => {
        setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div
                className="w-75 mx-auto shadow p-5"
                style={{ marginTop: '40px' }}
            >
                <h2 className="text-center mb-4">
                    Chỉnh sửa thông tin sản phẩm
                </h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Cập nhật tên sản phẩm"
                            name="product_name"
                            value={editedProduct.product_name}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Cập nhật giá sản phẩm"
                            name="product_price"
                            value={editedProduct.product_price}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Cập nhật đơn vị tính"
                            name="dvt"
                            value={editedProduct.dvt}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Cập nhật số lượng"
                            name="amount"
                            value={editedProduct.amount}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>
                    <button className="btn btn-warning btn-block">
                        Xác nhận
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductMaterial;
