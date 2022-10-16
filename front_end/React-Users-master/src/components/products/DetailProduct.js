import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const DetailProduct = () => {
  const [product, setProduct] = useState([]);


  const { id } = useParams();
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:9000/products/detail-paint-item/${id}`);
    // setProduct(result.data.reverse());
    const value = result.data.response

    setProduct(value[0])
  };


  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>

      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">Tên sản phẩm: {product.product_name}</li>
        <li className="list-group-item">Giá sản phẩm: {product.product_price}</li>

        <li className="list-group-item">Đơn vị tính: {product.dvt}</li>
        <li className="list-group-item">Số lượng: {product.amount}</li>
      </ul>
    </div>
  );
};

export default DetailProduct;
