import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddUser = () => {
  const url = "http://localhost:9000/products/create-paint-export"
  let history = useHistory();
  const [product, setProduct] = useState({
    id: "",
    nameProduct: "",
    priceProduct: "",
    statusProduct: "",  
    dvt: "",
    description: ""
  });



  const { id = "28", nameProduct, priceProduct, statusProduct, dvt, description } = product;
  const onInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await axios.get(url, product);
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
              name="nameProduct"
              value={nameProduct}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập giá sản phẩm"
              name="priceProduct"
              value={priceProduct}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập tình trạng sản phẩm"
              name="statusProduct"
              value={statusProduct}
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
              type="text"
              className="form-control form-control-lg"
              placeholder="Nhập mô tả sản phẩm"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-primary btn-block">Thêm</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
