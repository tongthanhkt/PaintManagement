import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddProduct = () => {
  const url = "http://localhost:9000/products/create-paint-item"
  let history = useHistory();
  const [product, setProduct] = useState({
    id: "",
    product_name: "",
    product_price: "",
    product_status: "",  
    dvt: "",
    amount: ""
  });



  const { id = "28", product_name, product_price, product_status, dvt, amount } = product;
  const onInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(url, product);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm sản phẩm sơn</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tên sản phẩm"
              name="product_name"
              value={product_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập giá mỗi sản phẩm"
              name="product_price"
              value={product_price}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tình trạng sản phẩm"
              name="product_status"
              value={product_status}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập đơn vị tính"
              name="dvt"
              value={dvt}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập số lượng sản phẩm"
              name="amount"
              value={amount}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
