import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

function ExportProduct() {
    let history = useHistory();
    const { id } = useParams();

    const [productExport, setProductExport] = useState([
        {
            amount: '',
        },
    ]);

    const { amount } = productExport;
    const onInputChange = (e) => {
        setProductExport({
            ...productExport,
            id,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const result = await axios.get(
            `https://be-paint-management1.onrender.com/products/detail-paint-item/${id}`,
        );
        console.log(id);
        console.log(result);

        // history.push("/");
    };
    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Thêm sản phẩm sơn</h2>
                <form onSubmit={(e) => onSubmit(e)}>
                    <div className="form-group">
                        <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="Nhập số lượng sản phẩm muốn xuất"
                            name="productExport"
                            value={productExport}
                            onChange={(e) => onInputChange(e)}
                        />
                    </div>

                    <button
                        className="btn btn-primary btn-block"
                        onClick={onSubmit}
                    >
                        Xuất hàng
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ExportProduct;
