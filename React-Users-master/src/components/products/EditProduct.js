import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditProduct = () => {
  let history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({

    product_name: "",
    product_price: "",
    product_status: "",  
    dvt: "",
    amount: ""
  });

  const {  product_name, product_price, product_status, dvt, amount } = product;
  const onInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:9000/products/${id}`, product);
    history.push("/");
  };

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:9000/products`);
    setProduct(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Name"
              name="product_name"
              value={product_name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder="Enter Your Username"
              name="product_price"
              value={product_price}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your E-mail Address"
              name="product_status"
              value={product_status}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Phone Number"
              name="dvt"
              value={dvt}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Website Name"
              name="amount"
              value={amount}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
