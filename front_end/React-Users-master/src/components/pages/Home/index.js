import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import styles from "./Home.module.scss"
import classNames from "classnames/bind"
import BoxExport from "../../BoxExport"

const cx = classNames.bind(styles)

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
    <div className={cx('container')}>
      <div className={cx('py-4')}>
        <h1 className={cx('header-title')}>Tồn kho</h1>
        <table className={cx('table',  'table-bordered')}>
          <thead className={cx('thead-dark')}>
            <tr>
              <th className={cx('table-custom')} scope="col"># Id</th>
              <th className={cx('table-custom')} scope="col">Tên sản phẩm</th>
              <th className={cx('table-custom')} scope="col">Giá mỗi sản phẩm</th>
              <th className={cx('table-custom')} scope="col">Tình trạng sản phẩm</th>
              <th className={cx('table-custom')} scope="col">Đơn vị tính</th>
              <th className={cx('table-custom')} scope="col">Số lượng sản phẩm</th>
              <th className={cx('table-custom')} scope="col">Tác vụ</th>
              <th className={cx('table-custom')} scope="col">Xuất hàng</th>

            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <th className={cx('table-custom')} scope="row">{index + 1}</th>
                <td className={cx('table-custom')}>{product.product_name}</td>
                <td className={cx('table-custom')}>{product.product_price}</td>
                <td className={cx('table-custom')}>{product.product_status}</td>
                <td className={cx('table-custom')}>{product.dvt}</td>
                <td className={cx('table-custom')}>{product.amount}</td>
                
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
                  {/* <td>
                  

                    
                      <NavLink exact to="/exportproduct" classNames={cx('btn', 'btn-danger')}>
                  Xuất hàng
                </NavLink>
                  </td> */}

                <BoxExport props={product.id}/>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default Home;
                  
