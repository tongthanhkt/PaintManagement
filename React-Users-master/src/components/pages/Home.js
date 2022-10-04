import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProduct] = useState([]);
  const url = "http://localhost:9000/products"

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const result = await axios.get(url);
    setProduct(result.data.reverse());
  };

  const deleteProduct = async id => {
    await axios.delete(`url/${id}`);
    loadProduct();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Tồn kho</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col"># Id</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá sản phẩm</th>
              <th scope="col">Tình trạng sản phẩm</th>
              <th scope="col">Đơn vị tính</th>
              <th scope="col">Mô tả sản phẩm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{product.nameProduct}</td>
                <td>{product.priceProduct}</td>
                <td>{product.statusProduct}</td>
                <td>{product.dvt}</td>
                <td>{product.description}</td>
                
                <td>
                  <Link class="btn btn-primary mr-2" to={`/products/${product.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${product.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
