import styles from './BoxExport.module.scss'
import classNames from 'classnames/bind'
import axios from "axios";
import { useParams } from "react-router-dom";
import React, {useState, useRef, useEffect} from 'react'



const cx = classNames.bind(styles)

function ButtonExport({props}) {
    const urlExport = "http://localhost:9000/products/create-paint-export"
    const urlDetail = "http://localhost:9000/products/detail-paint-item/"
    const productsId = props





    const [amountExport, setAmountExport] = useState({
        amount: "",
        productsId
    })

    const [newAmount, setNewAmount] = useState()

    const {amount} = amountExport

    console.log(amountExport)

    const onInputChange = e => {
        setAmountExport({ ...amountExport , [e.target.name]: e.target.value });
     };

     
    
    
    const handleSelect = (e) => {
        e.target.classList.add('hide')
        const wrapper = e.target.closest('div')
        wrapper.querySelector('div').classList.add('active')     

    }






    const handleCancelSelect = (e) => {
        e.target.classList.add('active')
        const wrapper = e.target.closest('div')
        wrapper.querySelector('div').classList.add('hide')  
    }

    return ( <div  className={cx('wrapper')}>
        <button onClick={handleSelect} id="btn-wrapper" className={cx('btn', 'btn-success')}>
            Chọn
        </button>

        <div id="input-wrapper" className={cx('input-wrapper')}>
        <input

            type='number'
            className = {cx('input')}
            placeholder='Nhập số lượng'
            name='amount'
            value={amount}
            onChange={e => onInputChange(e)}

        />

        <button onClick = {handleCancelSelect} className={cx('btn', 'btn-danger')}>
            Hủy
        </button>

        <button className={cx('btn', 'btn-light')}>Xác nhận</button>
        </div>

      
    </div> )
}

export default ButtonExport;





