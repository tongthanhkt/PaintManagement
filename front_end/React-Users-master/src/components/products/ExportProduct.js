import React, { useState, useRef } from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";


function ExportProduct() {
    const urlExport = "http://localhost:9000/products/create-paint-export"
    const urlProduct = "http://localhost:9000/products/:id"

  let history = useHistory();
  const { id } = useParams();

  const [productExport, setProductExport] = useState([{
    
    amount: ""
  }]);

  const { amount } = productExport;
  const onInputChange = e => {
    setProductExport({ ...productExport, id, [e.target.name]: e.target.value });
  };

  console.log(productExport);


  const loadCurrentAmount = async () => {
    const result = await axios.get(urlProduct);
    const currentAmount = result.amount


  };


  const onSubmit = async e => {
    e.preventDefault();
    await axios.post(urlExport, productExport);
    history.push("/");
    loadCurrentAmount()
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Thêm sản phẩm sơn</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
                
              type="number"
              className="form-control form-control-lg"
              placeholder="Nhập số lượng sản phẩm muốn xuất"
              name="amount"
              value={amount}
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <button className="btn btn-primary btn-block">Xuất hàng</button>
        </form>
      </div>
    </div>
  );
}

export default ExportProduct;







